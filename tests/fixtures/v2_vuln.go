package main

// Fixture: v1.1.0 rules, vulnerable Go.
import (
	"net/http"
	"text/template"
)

var expectedToken = "s3cr3t"

func page(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.New("p").Parse(r.URL.Query().Get("tpl"))
	_ = tmpl.Execute(w, nil)
}

func cors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
}

func login(w http.ResponseWriter, r *http.Request) {
	if r.FormValue("token") == expectedToken {
		w.Write([]byte("in"))
	}
}
