extern crate rand;

use rand::Rng;
use std::thread;

#[no_mangle]
pub extern "C" fn process() {
  let handles: Vec<_> = (0..10)
    .map(|_| {
      thread::spawn(|| {
        let mut target: Vec<u32> = Vec::new();

        let resource: Vec<u32> = (0..10000000).map(|_| rand::thread_rng().gen_range(0, 101)).collect();

        for element in &resource {
          let mut duplicate = false;
          for x in &target {
            if element == x {
              duplicate = true;
              break;
            }
          }
          if !duplicate {
            target.push(*element);
          }
        }
        target.len()
      })
    })
    .collect();

  for handle in handles {
    println!(
      "Поток завершился с результатом: {}",
      handle.join().map_err(|_| "Не удалось соедениться с потоком!").unwrap()
    );
  }
}
