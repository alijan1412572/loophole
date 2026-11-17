package main

// Fixture: v1.1.0 rules, clean Go (must produce ZERO findings).
import (
	"crypto/subtle"
	"html/template"
	"net/http"
)

var expectedToken = "s3cr3t"
var pageTmpl = template.Must(template.New("page").Parse("<h1>Hello</h1>"))

func page(w http.ResponseWriter, r *http.Request) {
	_ = pageTmpl.Execute(w, nil)
}

func cors(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "https://example.com")
}

func login(w http.ResponseWriter, r *http.Request) {
	got := r.FormValue("token")
	if subtle.ConstantTimeCompare([]byte(got), []byte(expectedToken)) == 1 {
		w.Write([]byte("in"))
	}
}
