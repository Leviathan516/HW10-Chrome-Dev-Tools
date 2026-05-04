/*
 * GigaPet - devtools.js
 * DevTools demo panel: 404, TypeError, Violation
 * Logs filter usage instructions to the console on load
 */

$(function () {

  // Filter instructions printed to the Console on every page load
  console.group('📋 DevTools Filter Instructions');

  console.log('%cFilter by Log Level',
    'font-weight:bold; color:#00e5ff;',
    '→ Use the "Default levels ▼" dropdown to show only Warnings or Errors.');

  console.log('%cFilter by Text',
    'font-weight:bold; color:#00e5ff;',
    '→ Type   [GigaPet]   in the Filter box to hide jQuery/browser noise.');

  console.log('%cFilter by Regular Expression',
    'font-weight:bold; color:#00e5ff;',
    '→ Type   /weight|happiness|energy/i   to match any stat name.');

  console.log('%cFilter by Message Source',
    'font-weight:bold; color:#00e5ff;',
    '→ Open Console sidebar → Message Sources → click "script.js".');

  console.log('%cFilter by User Messages',
    'font-weight:bold; color:#00e5ff;',
    '→ Console sidebar → "User Messages" hides 404s and violations.');

  console.groupEnd();

  // Inject demo panel into page
  $('body').append(
    '<div id="devtools-panel">' +
      '<div id="devtools-panel-title">🛠️ DevTools Demo</div>' +
      '<button id="btn-404">Cause 404 Error</button>' +
      '<button id="btn-typeerror">Cause TypeError</button>' +
      '<button id="btn-violation">Cause Violation</button>' +
    '</div>'
  );

  // 404 — fetch a non-existent file
  $('#btn-404').click(function () {
    fetch('images/does_not_exist.gif')
      .then(function (res) {
        if (!res.ok) console.error('[GigaPet] 404 confirmed:', res.status, res.url);
      })
      .catch(function (err) { console.error('[GigaPet] Network error:', err); });
  });

  // TypeError — call method on null
  $('#btn-typeerror').click(function () {
    var broken = null;
    broken.toUpperCase();   // throws TypeError with stack trace
  });

  // Violation — block main thread for 350ms (enable Verbose log level to see)
  $('#btn-violation').click(function () {
    var start = Date.now();
    while (Date.now() - start < 350) { /* synchronous busy-wait */ }
  });

});
