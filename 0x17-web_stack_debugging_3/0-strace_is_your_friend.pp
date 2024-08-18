This Puppet manifest renames the incorrectly named class-wp-locale.phpp to class-wp-locale.php
exec { 'fix-wordpress-locale-file':
  command => '/bin/mv /var/www/html/wp-includes/class-wp-locale.phpp /var/www/html/wp-includes/class-wp-locale.php',
  onlyif  => '/bin/test -f /var/www/html/wp-includes/class-wp-locale.phpp',
}

