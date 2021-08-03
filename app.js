const app = {
    data() {
        return {
            message: 'Hello Vue!',
            link_download_app: '#',
            version: '---',
            isLoadingVersion: true,
        }
    },
    mounted() {
        console.log('app created');
        this.get_version_LOL();
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

                    window.location.replace(link_download_app);
                });
            } catch {
                this.message = "error...";
            }

            this.isLoadingVersion = false;
        },
    }
}

Vue.createApp(app).mount('#app')
