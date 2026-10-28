// Next match and last result of a team (Vasco by default) from TheSportsDB (free public key),
// plus a match-day greeting. Team and name come from CONFIG.teamId and CONFIG.name.
(function () {
  'use strict';
  var CFG = window.CONFIG || {};
  var TEAM = String(CFG.teamId || '134282');
  var API = 'https://www.thesportsdb.com/api/v1/json/123/';
  var CACHE = 'tvhome.vasco';
  var REFRESH = 30 * 60 * 1000;
  var NAME = CFG.name || '';
  var DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  var LEAGUES = {
    'Brazilian Serie A': 'Brasileirão',
    'Copa Sudamericana': 'Sul-Americana',
    'Copa Libertadores': 'Libertadores',
    'Copa do Brasil': 'Copa do Brasil',
    'Campeonato Carioca': 'Carioca'
  };

  var card = document.getElementById('match');
  var data = null;
  try { data = JSON.parse(localStorage.getItem(CACHE)); } catch (e) {}

  function get(path, done) {
    var x = new XMLHttpRequest();
    x.open('GET', API + path);
    x.timeout = 15000;
    x.onload = function () {
      try { done(JSON.parse(x.responseText)); } catch (e) { done(null); }
    };
    x.onerror = x.ontimeout = function () { done(null); };
    x.send();
  }

  function team(n) { return n === 'Vasco da Gama' ? 'Vasco' : n; }
  function when(e) { return new Date(e.strTimestamp + 'Z'); }
  function two(n) { return (n < 10 ? '0' : '') + n; }
  function sameDay(a, b) { return a.toDateString() === b.toDateString(); }

  function badge(src) {
    return src ? '<img src="' + src + '/tiny" onerror="this.style.display=\'none\'">' : '';
  }

  function render() {
    var next = data && data.next, last = data && data.last;
    var now = new Date();
    window.GREETING = null;
    if (!next && !last) { card.className = 'hidden'; return; }

    var html = '';
    if (next) {
      var d = when(next);
      var live = now >= d && now - d < 2.25 * 3600 * 1000;
      var today = sameDay(d, now);
      var tomorrow = sameDay(d, new Date(now.getTime() + 864e5));
      var label = live ? 'Ao vivo agora' : today ? 'Hoje é dia de jogo' : 'Próximo jogo';
      var day = today ? 'Hoje' : tomorrow ? 'Amanhã' : DAYS[d.getDay()] + ' ' + two(d.getDate()) + '/' + two(d.getMonth() + 1);
      if (today || live) window.GREETING = 'Dia de jogo' + (NAME ? ', ' + NAME : '');
      card.className = live ? 'live' : today ? 'today' : '';
      html += '<div class="mLabel">' + label + '</div>' +
        '<div class="mTeams">' + badge(next.strHomeTeamBadge) + '<span>' + team(next.strHomeTeam) +
        ' <b>x</b> ' + team(next.strAwayTeam) + '</span>' + badge(next.strAwayTeamBadge) + '</div>' +
        '<div class="mInfo">' + day + ' · ' + two(d.getHours()) + ':' + two(d.getMinutes()) +
        (next.strVenue ? ' · ' + next.strVenue.replace('Estádio ', '') : '') + '</div>' +
        '<div class="mLeague">' + (LEAGUES[next.strLeague] || next.strLeague) +
        (next.intRound && next.strLeague === 'Brazilian Serie A' ? ' · Rodada ' + next.intRound : '') + '</div>';
    } else {
      card.className = '';
    }
    if (last && last.intHomeScore != null) {
      html += '<div class="mLast">Último: ' + team(last.strHomeTeam) + ' ' + last.intHomeScore + ' x ' +
        last.intAwayScore + ' ' + team(last.strAwayTeam) + '</div>';
    }
    card.innerHTML = html;
  }

  function refresh() {
    get('eventsnext.php?id=' + TEAM, function (n) {
      get('eventslast.php?id=' + TEAM, function (l) {
        if (!n && !l) return; // offline: keep the cached card
        data = {
          next: n && n.events && n.events[0] || null,
          last: l && l.results && l.results[0] || null
        };
        try { localStorage.setItem(CACHE, JSON.stringify(data)); } catch (e) {}
        render();
      });
    });
  }

  render();
  refresh();
  setInterval(refresh, REFRESH);
  setInterval(render, 60 * 1000); // label and greeting follow the clock
})();
