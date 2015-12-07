function createRenderer() {
    var cache = {};

    return function render(name, context) {
        if (cache[name])
            // Hurray! We already compiled this template earlier.
            return cache[name](context);

        // Compile the template so we can later pass the context object.
        var source = document.getElementById("template-" + name).innerHTML;
        var template = window.Handlebars.compile(source.trim());

        // Cache the compiled template for next time.
        cache[name] = template;

        return template(context);
    };
}

var render = createRenderer();

var TODOS = Immutable.List([]);
var HISTORY = [TODOS];

var $app = document.getElementById("app");

$app.innerHTML = render("app", {
    title: "Example Todo Application"
});

var $historySlider = document.getElementById("history-slider");
var $newTodo = document.getElementById("new-todo");
var $addTodo = document.getElementById("add-todo");
var $todos = document.getElementById("todos");

function renderTodos() {
    $todos.innerHTML = render("todos", {
        todos: TODOS.toJS()
    });
}

$historySlider.addEventListener("input", function(e) {
    TODOS = HISTORY[e.target.value];
    
    renderTodos();
});

$addTodo.addEventListener("click", function() {
    var value = $newTodo.value;

    if (!value.length)
        return;

    // Add the new todo.
    TODOS = TODOS.push(Immutable.Map({todo: value, done: false}));

    // Append the new state to the history array.
    HISTORY.push(TODOS);

    // Increment the length of the slider.
    $historySlider.setAttribute("max", HISTORY.length - 1);
    $historySlider.value = HISTORY.length - 1;
    
    renderTodos();

    // Clear the input
    $newTodo.value = "";
});



