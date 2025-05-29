class RecipeSearchApp extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.selectedMenuItemId = null;
                this.couldNotGetMenuItemDetails = 0;
                this.render();
                this.initializeEventListeners();
            }

            render() {
                this.shadowRoot.innerHTML = `
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
                        
                        * {
                            padding: 0;
                            margin: 0;
                            box-sizing: border-box;
                        }
                        
                        :host {
                            --orange: #edb268;
                            --green: #4db29e;
                            display: block;
                            width: 100%;
                            min-height: 650px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            font-family: 'Poppins', sans-serif;
                            font-size: 1.05rem;
                            line-height: 1.6;
                            position: relative;
                            border-radius: 12px;
                            overflow: auto;
                        }

                        .container {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            min-height: 600px;
                        }

                        #ingredient-search-container {
                            background-color: rgba(255, 255, 255, 0.95);
                            backdrop-filter: blur(10px);
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            display: flex;
                            flex-direction: column;
                            row-gap: 15px;
                            padding: 30px;
                            border-radius: 20px;
                            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                        }

                        .ingredient-search-item {
                            align-self: flex-start;
                        }

                        .title {
                            font-size: 1.8rem;
                            font-weight: 600;
                            color: #333;
                            margin-bottom: 10px;
                        }

                        .search-input-text {
                            padding: 12px 20px;
                            height: 50px;
                            width: 350px;
                            border-radius: 25px;
                            border: 2px solid #e0e0e0;
                            font-size: 1rem;
                            transition: all 0.3s ease;
                        }

                        .search-input-text:focus {
                            outline: none;
                            border-color: var(--orange);
                            box-shadow: 0 0 10px rgba(237, 178, 104, 0.3);
                        }

                        .search_button {
                            cursor: pointer;
                            outline: 0;
                            width: 120px;
                            height: 50px;
                            background: var(--orange);
                            color: #fff;
                            border: none;
                            border-radius: 25px;
                            font-size: 1rem;
                            font-weight: 500;
                            transition: all 0.3s ease;
                            margin-left: 10px;
                        }

                        .search_button:hover {
                            background: var(--green);
                            transform: translateY(-2px);
                            box-shadow: 0 5px 15px rgba(77, 178, 158, 0.4);
                        }

                        .loading-animation {
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            color: #666;
                        }

                        .spinner {
                            width: 24px;
                            height: 24px;
                            border: 3px solid #f3f3f3;
                            border-top: 3px solid var(--orange);
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                        }

                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }

                        .message {
                            color: #fff;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-top: 110px;
                            transform: translate(-50%, -50%);
                            background: rgba(0, 0, 0, 0.7);
                            padding: 20px;
                            border-radius: 10px;
                            text-align: center;
                        }

                        #search-result {
                            position: absolute;
                            top: 15rem;
                            width: 100%;
                            opacity: 0;
                            transition: opacity 0.5s ease;
                        }

                        #search-result.visible {
                            opacity: 1;
                        }

                        #meal-list {
                            padding: 2rem;
                            margin: 2.4rem 0;
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                            gap: 2rem;
                        }

                        .meal-item {
                            cursor: pointer;
                            border-radius: 15px;
                            overflow: hidden;
                            background-color: #fff;
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                            transition: all 0.3s ease;
                        }

                        .meal-item:hover {
                            background-color: var(--orange);
                            transform: translateY(-5px);
                            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                        }

                        .meal-img img {
                            width: 100%;
                            height: 200px;
                            object-fit: cover;
                            display: block;
                        }

                        .meal-name {
                            padding: 1.5rem;
                        }

                        .meal-name h3 {
                            font-size: 1.4rem;
                            color: #333;
                        }

                        .meal-item:hover .meal-name h3 {
                            color: #fff;
                        }

                        #meal-details {
                            background-color: #fff;
                            position: absolute;
                            z-index: 100;
                            width: 370px;
                            max-height: 400px;
                            border-radius: 15px;
                            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                            overflow-y: auto;
                            opacity: 0;
                            transition: all 0.3s ease;
                        }

                        #meal-details.visible {
                            opacity: 1;
                        }

                        #meal-details::-webkit-scrollbar {
                            width: 8px;
                        }

                        #meal-details::-webkit-scrollbar-thumb {
                            background: #ddd;
                            border-radius: 10px;
                        }

                        #meal-details-content {
                            margin: 2rem;
                        }

                        #meal-details-content p:not(.recipe-category) {
                            padding: 1rem 0;
                            line-height: 1.6;
                        }

                        .recipe-title {
                            color: #333;
                            font-size: 1.8rem;
                            margin-bottom: 1rem;
                            max-width: 90%;
                        }

                        .recipe-category {
                            color: #666;
                            margin-bottom: 0.5rem;
                        }

                        .recipe-close-btn, .recipe-delete-btn {
                            cursor: pointer;
                            position: absolute;
                            right: 2rem;
                            font-size: 1.2rem;
                            background: #fff;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            border: 2px solid #ddd;
                            transition: all 0.3s ease;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .recipe-close-btn {
                            top: 1rem;
                        }

                        .recipe-delete-btn {
                            top: 4rem;
                        }

                        .recipe-close-btn:hover, .recipe-delete-btn:hover {
                            color: white;
                            background: #333;
                            border-color: #333;
                        }

                        .recipe-meal-img img {
                            width: 120px;
                            height: 120px;
                            border-radius: 50%;
                            margin: 1rem auto;
                            display: block;
                            object-fit: cover;
                        }

                        .recipe-link a {
                            display: inline-block;
                            background: var(--orange);
                            color: white;
                            padding: 10px 20px;
                            border-radius: 25px;
                            text-decoration: none;
                            transition: all 0.3s ease;
                        }

                        .recipe-link a:hover {
                            background: var(--green);
                            transform: translateY(-2px);
                        }

                        .hidden {
                            visibility: hidden;
                            opacity: 0;
                        }

                        .visible {
                            visibility: visible;
                            opacity: 1;
                        }

                        #api-error-menu-item {
                            position: absolute;
                            z-index: 120;
                            background: rgba(220, 53, 69, 0.9);
                            color: white;
                            padding: 10px 15px;
                            border-radius: 10px;
                            font-size: 0.9rem;
                        }
                    </style>

                    <div class="container">
                        <form id="ingredient-search-container">
                            <h2 class="ingredient-search-item title">Recipe Search</h2>
                            <div style="display: flex; align-items: center;">
                                <input type="text" id="search-input" class="search-input-text" placeholder="Enter an ingredient (e.g., chicken, tomato)">
                                <button id="search-ingredient-submit" type="submit" class="search_button">
                                    Search
                                </button>
                            </div>
                            <div id="animation" class="hidden">
                                <div class="loading-animation">
                                    <div class="spinner"></div>
                                    <span>Searching recipes...</span>
                                </div>
                            </div>
                        </form>

                        <div id="no-search-results" class="message hidden">
                            No recipes found for this ingredient. Try searching for something else!
                        </div>

                        <div id="api-error-menu-list" class="message hidden">
                            Could not retrieve recipes. Please check your connection and try again.
                        </div>

                        <div id="api-error-menu-item" class="hidden">
                            Could not load recipe details
                        </div>

                        <div id="search-result" class="hidden">
                            <div id="meal-list"></div>
                        </div>

                        <div id="meal-details" class="hidden">
                            <button type="button" class="recipe-close-btn" id="recipe-close-btn">
                                ✕
                            </button>
                            <button type="button" class="recipe-delete-btn" id="recipe-delete-btn">
                                🗑
                            </button>
                            <div id="meal-details-content"></div>
                        </div>
                    </div>
                `;
            }

            initializeEventListeners() {
                const form = this.shadowRoot.getElementById('ingredient-search-container');
                const closeBtn = this.shadowRoot.getElementById('recipe-close-btn');
                const deleteBtn = this.shadowRoot.getElementById('recipe-delete-btn');

                form.addEventListener('submit', this.search.bind(this));
                closeBtn.addEventListener('click', this.closeRecipeDetails.bind(this));
                deleteBtn.addEventListener('click', this.deleteMenuItem.bind(this));
            }

            search(e) {
                e.preventDefault();
                
                this.showElement('animation');
                this.hideElement('meal-details');
                this.hideElement('api-error-menu-item');
                this.hideElement('no-search-results');
                this.hideElement('api-error-menu-list');
                this.hideElement('search-result');
                
                setTimeout(() => this.callApiForMenuList(), 1500);
            }

            async callApiForMenuList() {
                const searchInput = this.shadowRoot.getElementById('search-input');
                const searchTerm = searchInput.value.trim();
                
                if (!searchTerm) {
                    this.hideElement('animation');
                    return;
                }

                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
                    const data = await response.json();
                    
                    this.hideElement('animation');
                    
                    if (!data.meals) {
                        this.animateSearchContainer('50%');
                        setTimeout(() => this.showElement('no-search-results'), 1000);
                    } else {
                        this.animateSearchContainer('25%');
                        setTimeout(() => this.showMealList(data), 1000);
                    }
                } catch (error) {
                    this.hideElement('animation');
                    this.showElement('api-error-menu-list');
                }
            }

            animateSearchContainer(topPosition) {
                const container = this.shadowRoot.getElementById('ingredient-search-container');
                container.style.transition = 'top 1s ease';
                container.style.top = topPosition;
            }

            showMealList(data) {
                let htmlString = "";
                
                if (data.meals) {
                    data.meals.forEach(meal => {
                        htmlString += `
                            <div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                </div>
                                <div class="meal-name">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>
                        `;
                    });
                }

                const mealList = this.shadowRoot.getElementById('meal-list');
                mealList.innerHTML = htmlString;

                // Add click listeners to meal items
                const mealItems = this.shadowRoot.querySelectorAll('.meal-item');
                mealItems.forEach(item => {
                    item.addEventListener('click', () => {
                        console.log(item);
                        const rect = item.getBoundingClientRect();
                        const containerRect = mealList.getBoundingClientRect();
                        const position = {
                            top: rect.top - containerRect.top,
                            left: rect.left - containerRect.left
                        };
                        this.getRecipe(item.dataset.id, position);
                    });
                });

                this.showElement('search-result');
            }

            getRecipe(menuItemId, position) {
                this.selectedMenuItemId = menuItemId;
                this.hideElement('meal-details');
                this.callApiForMenuItem(menuItemId, position);
            }

            async callApiForMenuItem(menuItemId, position) {
                this.hideElement('api-error-menu-item');

                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuItemId}`);
                    const data = await response.json();
                    
                    this.couldNotGetMenuItemDetails = 0;
                    this.displayRecipeDetails(data);
                    this.positionRecipeDetails(position);
                } catch (error) {
                    this.couldNotGetMenuItemDetails = 1;
                    this.positionErrorMessage(position);
                }
            }

            displayRecipeDetails(data) {
                const meal = data.meals[0];
                const content = this.shadowRoot.getElementById('meal-details-content');
                
                content.innerHTML = `
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <h4 class="recipe-category">Category - ${meal.strCategory}</h4>
                    <p class="recipe-category">${meal.strArea} food</p>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    ${meal.strYoutube ? `
                        <div class="recipe-link">
                            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                        </div>
                    ` : ''}
                `;
            }

            positionRecipeDetails(position) {
                const details = this.shadowRoot.getElementById('meal-details');
                details.style.top = `${position.top + 200}px`;
                details.style.left = `${position.left - 10}px`;
                
                setTimeout(() => {
                    this.showElement('meal-details');
                    if (this.couldNotGetMenuItemDetails === 1) {
                        this.showElement('api-error-menu-item');
                    }
                }, 300);
            }

            positionErrorMessage(position) {
                const errorMsg = this.shadowRoot.getElementById('api-error-menu-item');
                errorMsg.style.top = `${position.top + 240}px`;
                errorMsg.style.left = `${position.left + 50}px`;
            }

            closeRecipeDetails() {
                this.hideElement('meal-details');
                this.hideElement('api-error-menu-item');
            }

            deleteMenuItem() {
                this.hideElement('meal-details');
                this.hideElement('api-error-menu-item');

                const mealItems = this.shadowRoot.querySelectorAll('.meal-item');
                const itemToDelete = Array.from(mealItems).find(item => 
                    item.dataset.id === this.selectedMenuItemId
                );

                if (itemToDelete) {
                    itemToDelete.style.transition = 'all 0.5s ease';
                    itemToDelete.style.transform = 'translateX(-100%)';
                    itemToDelete.style.opacity = '0';
                    
                    setTimeout(() => {
                        itemToDelete.remove();
                    }, 500);
                }
            }

            showElement(id) {
                const element = this.shadowRoot.getElementById(id);
                element.classList.remove('hidden');
                element.classList.add('visible');
            }

            hideElement(id) {
                const element = this.shadowRoot.getElementById(id);
                element.classList.remove('visible');
                element.classList.add('hidden');
            }
        }

        // Register the custom element
        customElements.define('recipe-search-app', RecipeSearchApp);