// Fixture: v1.1.0 rules, clean JavaScript (must produce ZERO findings).
const express = require('express');
const ejs = require('ejs');
const crypto = require('crypto');
const helmet = require('helmet');
const csrf = require('csurf');
const app = express();
app.use(helmet());
app.use(csrf({ cookie: true }));

const TEMPLATE = '<h1>Hello <%= name %></h1>';

app.get('/page', (req, res) => {
  const html = ejs.render(TEMPLATE, { name: req.query.name });
  res.send(html);
});

app.get('/c', (req, res) => {
  res.cookie('session', req.sessionID, { httpOnly: true, secure: true, sameSite: 'lax' });
  res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
  res.end('ok');
});

app.post('/login', (req, res) => {
  const a = Buffer.from(String(req.body.token));
  const b = Buffer.from(String(expectedToken));
  if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
    res.end('in');
  }
});

app.get('/go', (req, res) => {
  const dest = '/dashboard';
  window.location = dest;
});
