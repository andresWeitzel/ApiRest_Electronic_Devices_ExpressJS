#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive test suite...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${colors.cyan}▶ ${description}...${colors.reset}`);
  try {
    const output = execSync(command, { 
      stdio: 'pipe', 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    log(`✅ ${description} completed successfully`, 'green');
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    log(error.stdout || error.message, 'red');
    return { success: false, error: error.stdout || error.message };
  }
}

// Test results storage
const testResults = {
  unit: null,
  integration: null,
  coverage: null,
  total: { passed: 0, failed: 0, total: 0 }
};

// Run unit tests
log('📋 Running Unit Tests', 'bright');
testResults.unit = runCommand('npm run test:unit', 'Unit Tests');

// Run integration tests
log('\n📋 Running Integration Tests', 'bright');
testResults.integration = runCommand('npm run test:integration', 'Integration Tests');

// Run coverage tests
log('\n📋 Running Coverage Tests', 'bright');
testResults.coverage = runCommand('npm run test:cov', 'Coverage Tests');

// Run specific test suites
log('\n📋 Running Specific Test Suites', 'bright');
runCommand('npm run test:pagination-helpers', 'Pagination Helpers Tests');
runCommand('npm run test:services', 'Services Tests');
runCommand('npm run test:validations', 'Validation Tests');

// Generate test summary
log('\n📊 Test Summary', 'bright');
log('=' * 50, 'cyan');

if (testResults.unit.success) {
  log('✅ Unit Tests: PASSED', 'green');
} else {
  log('❌ Unit Tests: FAILED', 'red');
}

if (testResults.integration.success) {
  log('✅ Integration Tests: PASSED', 'green');
} else {
  log('❌ Integration Tests: FAILED', 'red');
}

if (testResults.coverage.success) {
  log('✅ Coverage Tests: PASSED', 'green');
} else {
  log('❌ Coverage Tests: FAILED', 'red');
}

// Check if coverage report exists
const coveragePath = path.join(process.cwd(), 'coverage', 'lcov-report', 'index.html');
if (fs.existsSync(coveragePath)) {
  log(`📈 Coverage report generated: ${coveragePath}`, 'blue');
}

// Generate test report
const reportPath = path.join(process.cwd(), 'test-report.json');
const report = {
  timestamp: new Date().toISOString(),
  results: testResults,
  summary: {
    totalTests: testResults.total.total,
    passedTests: testResults.total.passed,
    failedTests: testResults.total.failed,
    successRate: testResults.total.total > 0 ? 
      ((testResults.total.passed / testResults.total.total) * 100).toFixed(2) + '%' : '0%'
  }
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
log(`📄 Test report saved: ${reportPath}`, 'blue');

// Final status
const allPassed = testResults.unit.success && testResults.integration.success && testResults.coverage.success;

if (allPassed) {
  log('\n🎉 All tests passed successfully!', 'green');
  process.exit(0);
} else {
  log('\n💥 Some tests failed. Please review the output above.', 'red');
  process.exit(1);
} 