const app = {
    data() {
        return {
            message: 'Hello Vue!',
            link_download_app: '#',
            link_download_app2: '#',
            version: '---',
            isLoadingVersion: true,
            isSuccess: false,
        }
    },
    mounted() {
        console.log('app created');
        this.get_version_LOL();
        this.get_version_LOL2();
    },
    methods: {
        get_version_LOL: function () {

            console.log("get_version_LOL");
            this.isLoadingVersion = true;

            try {
                var url = 'http://lienminh.garena.vn/news/cap-nhat';
                var CROS_url = `https://cors-anywhere.herokuapp.com/${url}`;
                console.log(CROS_url);
                this.message = "waiting get version LOL...";
                fetch(CROS_url).then(d => {
                    return d.text();
                }).then(html => {

                    var jq = window.$;
                    var doc = new DOMParser().parseFromString(html, 'text/html');
                    var xpath = '//*[@id="news"]/div[1]/a/div[2]/h2';
                    var first_news = doc.evaluate(xpath, doc);
                    var pbcn = first_news.iterateNext().textContent;
                    var rg = /([0-9.]+)/;
                    var kq = pbcn.match(rg);
                    var version = kq[0];
                    var link_download_app = `http://s4.modskinlolvn.com/MODSKIN_${version}.zip`;
                    this.version = version;
                    this.link_download_app = link_download_app;
                    this.message = `success. LOL version ${version}`;

                    if (!this.isSuccess) {
                        window.location.replace(this.link_download_app);
                    }
                    this.isSuccess = true;
                });
            } catch {
                this.message = "error...";
            }

            this.isLoadingVersion = false;
        },

        get_version_LOL2: function () {

            try {
                var url = `https://bypasscors.ddns.net/bypass?url=http://modskinpro.com/p/tai-phan-mem-mod-skin-lol-pro-2020-chn`;
                fetch(url)
                    .then(d => d.text())
                    .then(html => {
                        var links = html.match(/link2 =\s*"(.+)"/);
                        if (links.length > 1) {
                            this.link_download_app2 = links[1];

                            if (!this.isSuccess) {
                                window.location.replace(this.link_download_app2);
                            }
                            this.isSuccess = true;
                        } else {
                            this.link_download_app2 = links.join(',');
                        }
                    })
                    .catch(e => {
                        debugger
                        alert('error');
                    });
            }
            catch {
                debugger;
            }
        }
    }
}

Vue.createApp(app).mount('#app')
