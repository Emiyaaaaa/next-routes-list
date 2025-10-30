#!/usr/bin/env node
"use strict";

const path = require("node:path");
const { execSync } = require("node:child_process");

const color = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
};

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const projectDir = path.join(__dirname, "next-project");

  console.log(color.bold("🧪 Running Next routes generation test"));
  console.log(`${color.gray("Project:")} ${path.relative(repoRoot, projectDir)}`);

  try {
    // Run the generator in the test project directory
    execSync("node ../../dist/generate.js", {
      cwd: projectDir,
      stdio: "inherit",
    });
  } catch (err) {
    console.error(color.red("Failed to run route generator."));
    process.exitCode = 1;
    return;
  }

  // Load expected and actual routes
  const expected = require(path.join(__dirname, "routes.js")).routes;
  const actual = require(path.join(repoRoot, "dist/routes.js")).routes;

  const same = JSON.stringify(expected) === JSON.stringify(actual);
  if (same) {
    console.log(JSON.stringify(actual, null, 2));
    console.log(
      color.green("✅ Test succeeded: Generated routes match expected output.")
    );
    return;
  }

  // Build a helpful diff
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  const missing = expected.filter((r) => !actualSet.has(r));
  const extra = actual.filter((r) => !expectedSet.has(r));

  function firstOrderMismatch(a, b) {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) return { index: i, expected: a[i], actual: b[i] };
    }
    return null;
  }

  const orderIssue = firstOrderMismatch(expected, actual);

  console.error(color.red("❌ Test failed: Generated routes differ from expected."));
  console.error(`${color.gray("Expected count:")} ${expected.length}`);
  console.error(`${color.gray("Actual count:")}   ${actual.length}`);

  if (missing.length) {
    console.error(color.yellow("Missing routes (expected but not generated):"));
    for (const r of missing) console.error(`  - ${r}`);
  }

  if (extra.length) {
    console.error(color.yellow("Unexpected routes (generated but not expected):"));
    for (const r of extra) console.error(`  - ${r}`);
  }

  if (!missing.length && !extra.length && orderIssue) {
    console.error(color.yellow("Order mismatch (same items, different order):"));
    console.error(
      `  At index ${orderIssue.index}: expected ${orderIssue.expected}, got ${orderIssue.actual}`
    );
  }

  process.exitCode = 1;
}

main();


