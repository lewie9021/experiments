function createRender() {
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

var render = createRender();

var $app = document.getElementById("app");
$app.innerHTML = render("app", {
    title: "Example Todo Application",
    todos: [
        {todo: "Hello", done: true},
        {todo: "World", done: false}
    ]
});
