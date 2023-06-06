var app = new Vue({
    el: '#app',

    template: ``,

    data: {

        screen: 0,

        modalActive: 1,

        modal: true,

        forSale: [
            {
                name: 'A',
                rarity: 'common',/* common rare legendary */
                photo: 'icon',
                favorite: false,
            },
            {
                name: 'B',
                rarity: 'rare',
                photo: 'icon',
                favorite: false,
            },

            {
                name: 'C',
                rarity: 'legendary',
                photo: 'icon',
                favorite: false,

            },

            {
                name: 'D',
                rarity: 'legendary',
                photo: 'icon',
                favorite: false,

            },
         
            {
                name: 'E',
                rarity: 'legendary',
                photo: 'icon',
                favorite: false,

            },

        ],

        selectedFilter: '',

        temp : {
            name: '',
            rarity: '',
            photo: 'icon',
            favorite: false,
        }

    },

    methods: {

        sortPosition(action) {
            action.sort(function (a, b) {
                let nomeA = a.name.toUpperCase();
                let nomeB = b.name.toUpperCase();

                if (nomeA < nomeB) {
                    return -1;
                }

                if (nomeA > nomeB) {
                    return 1;
                }
            });
            for (let i = 0; i < action.length; i++) {

                if (action[i].favorite) {
                    action.unshift(action[i])
                    action.splice(i + 1, 1)
                }


            };
        },

        /* reordena quando favoritar e desfavoritar */
        setFavorite(element, index, action, array) {
            if (action == 'add') {
                array.unshift(element)
                array.splice(index + 1, 1)
            } else {
                this.sortPosition(array)
            }
        },
      
        /* setando e removendo filtro */
        chooseFilter(filterType) {

            if (this.selectedFilter == filterType) {
                this.selectedFilter = ''

            } else if (this.selectedFilter != filterType) {
                this.selectedFilter = filterType
            }

            console.log(this.selectedFilter)

        },

        changeScreen(nextScreen) {
            this.screen = nextScreen
            this.selectedFilter = ''

            if (nextScreen == 0) {
                this.sortPosition(this.forSale)
                console.log('aaaa')
            } else if (nextScreen == 1) {
                this.sortPosition(this.mySkins)
                console.log('bbb')
            }
        },

        insertModal(nextModal, statsModal) {
            this.modalActive = nextModal
            this.modal = statsModal
        },

        closeUI() {
            let el = document.querySelector('buySkinsContainer')

           /*  el.classList.remove("slide-in-blurred-top"); */
            /* el.classList.add("slide-out-top"); */
            console.log(el)
            this.modal = false
        },

        zeroingVariable(){
            this.temp.name = ''
            this.temp.rarity = ''
        },

        insertItem() {

            let element = JSON.parse(JSON.stringify(this.temp))
            element.name = element.name.toLowerCase()
            element.rarity = element.rarity.toLowerCase()

            
            if (element.name != '' && element.rarity != '') {
                
               if ( element.rarity == 'common'  || element.rarity == 'rare' || element.rarity == 'legendary') {
                console.log(element.name)
                console.log(element.rarity)
                this.forSale.push(element)
                this.insertModal(false)
                this.sortPosition(this.forSale)
               } else {
                 this.insertModal(2,true)
               }

            } else {
                this.insertModal(2,true)
            }

            

            this.zeroingVariable()
        },

    },



    mounted() {

        this.sortPosition(this.forSale)

        document.addEventListener('keydown', (event) => {

            const keyName = event.key;

            if (keyName == 'Escape') {

                if (app.modal) {
                    this.modal = false
                    this.modalActive = 0
                } else {
                     app.closeUI()
                }
            }

        });

    },

});