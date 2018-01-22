class Controller {
    // DOM Element
    private lists: any;
    private items: any;

    // CONSTANT
    private BASE_URL: string;
    private USER_NAME: string;
    private MAX_LENTH: number;

    UP_KEY: number = 38;
    DOWN_KEY: number = 40;

    // status
    private index: number;

    constructor() {
        this.BASE_URL = 'https://api.github.com/users';
        this.USER_NAME = 'JaeYeopHan';
        this.index = 0;

        this.init();
        
    }

    async init() {
        const response = await fetch(`${this.BASE_URL}/${this.USER_NAME}/repos`);
        const repos = await response.json();

        this.MAX_LENTH = repos.length;
        const chunk = repos.map(({name, html_url}: {name: string, html_url: string}, i: number) => {
            if (i === 0) {
                return `
                    <li class="octodirect_item active" id="octodirect_item_${i}">
                        <a href=${html_url}>${name}</a>
                    </li>`;            
            }
            return `
                <li class="octodirect_item" id="octodirect_item_${i}">
                    <a href=${html_url}>${name}</a>
                </li>`;
            })
            .join("");

        this.lists = document.querySelector('#octodirect_repo_lists');
        this.lists.innerHTML = chunk;
        this.items = document.querySelectorAll('.octodirect_item');

        this.attach();
    }

    attach() {
        document.querySelector('#octodirect_input_tag').addEventListener('keyup', (e: any) => {
            if (e.which === this.UP_KEY) {
                if (this.index <= 0) {
                    return;
                }
                this.index -= 1;
                this.updateActiveItem();
                this.adjustScroll();
            }
            if (e.which === this.DOWN_KEY) {
                if (this.index >= 50) {
                    return;
                }
                this.index += 1;
                this.updateActiveItem();
                this.adjustScroll();
            }

            if (e.which === 13) {
                const value = this.items[this.index].textContent.trim();
                e.target.value = value;

                // TODO Not correct
                location.href = `https://github.com/${this.USER_NAME}/${value}`;
            }
        })
    }

    updateActiveItem() {
        this.items.forEach((item: any, currentIndex: number) => {
            item.classList.remove('active');
            currentIndex === this.index && item.classList.add('active');
        });
    }

    adjustScroll() {
        // TODO set target point more detailed.
        this.lists.scrollTop = this.index * 20;
        console.log(this.lists.scrollTop);
    }
}

export default Controller;
