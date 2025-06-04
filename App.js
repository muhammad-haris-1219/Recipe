let sectioned = document.querySelector('section')
let recipeHeading = document.querySelector('#recipe_heading');
let recipeParagraph = document.querySelector('#recipe_paragraph');
let lists = document.querySelector('.lists');
let titled = document.querySelector('article h4');
let recipeTitle = document.querySelector('#RecipeTitle');
let recipeIngredients = document.querySelector('#Ingradient');
let recipeInstruction = document.querySelector('#instruction');
let searchValue = document.querySelector('#searchValue');
let minimized = document.querySelector('#minimized ');

const recipeURL = fetch('./recipes.json')
    .then((recipeData) => recipeData.json())
    .then((recipeData) => {

        let detailRecipe = (deatils) => {
            recipeIngredients.innerText = "";
            recipeTitle.innerText = deatils.title;
            deatils.ingredients.forEach((ingr) => {
                let ingrList = `<li>${ingr}</li>`;
                recipeIngredients.innerHTML += ingrList;
            });
            recipeInstruction.innerText = deatils.instructions;
            if (screen.width < 768) {
                titled.parentElement.style.display = "grid";
                sectioned.style.display = "none";
                minimized.addEventListener('click', () => {
                    sectioned.style.display = "grid";
                    titled.parentElement.style.display = "none";
                });
            };
        };

        let displayRecipe = (item) => {
            lists.innerHTML = '';
            item.forEach(li => {
                let list = document.createElement('li');
                list.innerHTML = ` <h3>${li.title}</h3>
                              <p>${li.description}</p>`;
                lists.appendChild(list);
                list.addEventListener('click', () => detailRecipe(li));

            });
        };

        // if (screen.width < 768) {
        //     titled.parentElement.style.display = "none"
        //  sectioned.style.display = "none"
        // }
        searchValue.addEventListener('input', () => {
            const searchRecipe = recipeData.filter((recipe) => {
                return recipe.title.toUpperCase().indexOf(searchValue.value.toUpperCase()) > -1
                    || recipe.ingredients.join('').toUpperCase().indexOf(searchValue.value.toUpperCase()) > -1;
            });
            displayRecipe(searchRecipe);
        });

    });




