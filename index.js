const ffi = require('ffi');

const lib = ffi.Library('target/release/libembed', {
  'process': ['void', []]
});

console.log('rust embed lib.process running!');
console.time('Rust: lib.process');
lib.process();
console.timeEnd('Rust: lib.process');


function process() {
  const resource = Array(10000000).fill(0).map(() => ~~(Math.random() * 101));
  const target = [];

  for (const element of resource) {
    let notPush = false;
    for (const x of target) {
      if (x == element) {
        notPush = true;
        break;
      }
    }

    if (!notPush) {
      target.push(element);
    }
  }

  return target.length;
}

function promised(cb) {
  return Promise.resolve().then(() => cb());
}

const all = Array(10).fill().map(() => promised(() => console.log(`Поток завершился с результатом: ${process()}`)))

console.log('node js process running!');
console.time('NodeJS: process');
Promise.all(all).then(() => console.timeEnd('NodeJS: process'));
