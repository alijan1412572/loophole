// Fixture: v1.1.0 rules, vulnerable JavaScript.
const express = require('express');
const ejs = require('ejs');
const libxml = require('libxmljs');
const v8 = require('v8');
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.get('/page', (req, res) => {
  const html = ejs.render(req.query.tpl, {});
  res.send(html);
});

app.get('/c', (req, res) => {
  res.cookie('session', req.sessionID, { httpOnly: false });
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('X-Return-To', req.query.next);
  res.end('ok');
});

const corsOptions = { origin: '*', credentials: true };

app.post('/login', (req, res) => {
  if (req.body.token === expectedToken) {
    res.end('in');
  }
});

app.get('/go', (req, res) => {
  const next = new URLSearchParams(location.search).get('next');
  window.location = next;
});

const doc = libxml.parseXml(req.body, { noent: true });

app.post('/frag', (req, res) => {
  el.insertAdjacentHTML('beforeend', req.body.html);
  const obj = v8.deserialize(req.body.payload);
});
