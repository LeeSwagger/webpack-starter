import './../sass/styles.scss';

const component = () => {
    const helloWebpack = _.join(_.values({
        a: 'Hello',
        b: 'webpack'
    }), ' ');

    const element = document.createElement('h1');

    element.innerHTML = helloWebpack;

    return element;
};

document.body.appendChild(component());
