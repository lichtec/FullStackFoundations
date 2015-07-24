#DevOpsLvl1.rb Chef Implementation

package 'nginx'

service 'nginx' do
	action [:enable, :start]
end
	
file '/etc/nginx/nginx.conf' do
	content 'http {
				server {
							listen 8080 default_server;
							server_name _;
							location / { root /www; }
						}
			}'
	notifies :reload, 'service[nginx]'
end

