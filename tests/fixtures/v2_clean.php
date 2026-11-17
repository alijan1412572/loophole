<?php
// Fixture: v1.1.0 rules, clean PHP (must produce ZERO findings).
$tpl = $twig->load('page.html');
echo $tpl->render(['name' => $name]);

setcookie('session', $sid, ['httponly' => true, 'secure' => true, 'samesite' => 'Lax']);

$ch = curl_init('https://api.example.com');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

header('Access-Control-Allow-Origin: https://example.com');
header('X-Content-Type-Options: nosniff');

$reset_token = bin2hex(random_bytes(32));

if (hash_equals($stored_token, $_POST['token'])) {
    echo 'in';
}
