# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.define "web", primary: true do |web|
        web.vm.box = "precise64"
        web.vm.box_url = "http://files.vagrantup.com/precise64.box"
        # Set the MD5 for the box
        web.vm.box_download_checksum = "5803ee2fa7c5ded51a59f7928a2fead0"
        web.vm.box_download_checksum_type = "md5"

        # Configure the hostname of the box to be set at boot
        web.vm.hostname = "startupwichita"

        # Set the host only ip
        web.vm.network :private_network, ip: "10.10.100.100"
        web.vm.network :forwarded_port, host: 3000, guest: 3000

        web.vm.synced_folder ENV["STARTUPWICHITA_WEBROOT"] || "./", "/var/www/startupwichita.com", create: true

        web.vm.provider "virtualbox" do |v|
            v.name = "startupwichita-web"
            v.customize ["modifyvm", :id, "--memory", "1024"]
        end

        web.vm.provision :shell, :path => "vm/shell/prereqs.sh", :args => "vm/puppet/librarian/web"

        web.vm.provision :puppet do |web_puppet|
            web_puppet.manifests_path = "vm/puppet/manifests"
            web_puppet.manifest_file  = "site.pp"
        end

        if File.exist? "./Vagrantfile.web"
            WEB = web
            load "./Vagrantfile.web"
        end
    end
end
