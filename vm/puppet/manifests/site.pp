# installs required dependent packages then
# gets nodejs and npm package from puppet forge
# after nodejs is installed will then install npm modules required for MEAN Stack

file { "/var/www/startupwichita.com":
    ensure  => "directory",
    mode    => '0664'
}

# install mongodb
class {'::mongodb::globals':
  manage_package_repo => true,
}->
class {'::mongodb::server': }

# install nodejs and npm
class { 'nodejs':
    version => 'v0.10.26'
}

## install the required node modules using NPM

# install express
package { 'express':
    ensure   => present,
    provider => 'npm',
}

# infostall jade
package { 'jade':
    ensure   => present,
    provider => 'npm',
}

# install mongoose
package { 'mongoose':
    ensure   => present,
    provider => 'npm',
}

# infostall bower
package { 'bower':
    ensure   => present,
    provider => 'npm',
}

# install jasmine for testing
package { 'jasmine-node':
    ensure   => present,
    provider => 'npm',
}

# install nodeunit for testing
package { 'nodeunit':
    ensure   => present,
    provider => 'npm',
}

# install nodeunit for testing
package { 'grunt-cli':
    ensure   => present,
    provider => 'npm',
}
