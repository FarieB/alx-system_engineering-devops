# create a manifest that fix all termintion of phpp.

exec { 'fix_wordpress-server-error':
    command => 'sed -i s/phpp/php/g /var/www/html/wp-settings.php',
    path    => '/bin', '/usr/bin/', '/usr/loca/bin/'
}
