#DevOpsLvl1.pp
package { "nginx":
    ensure => installed
}

file { "/www":
    ensure => "directory"
}
file { "/www/index.html":
    require => File["/www"],
    ensure => "file",
    content => "<html>
  <head>
    <title>DevOps Test - Level One</title>
  </head>
  <body bgcolor=white>

    <table border="0" cellpadding="10">
      <tr>
        <td>ZZ
          <h1>You're doing it, Peter!</h1>
        </td>
      </tr>
    </table>

  </body>
</html>
        "
}

file { "/etc/nginx/sites-available/devOpsLvl1":
    require => [
        Package["nginx"],
        File["/www"]
    ],

    ensure => "file",
    content => 
        "server {
            listen 8888 default_server;
            server_name _;
            location / { root /www; }
        }",
    notify => Service["nginx"]
}
file { "/etc/nginx/sites-enabled/devOpsLvl1":
    require => File["/etc/nginx/sites-available/devOpsLvl1"],
    ensure => "link",
    target => "/etc/nginx/sites-available/devOpsLvl1",
    notify => Service["nginx"]
}

service { "nginx":
    require => Package["nginx"],
    ensure => running,
    enable => true
}

