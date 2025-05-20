async function run() {
  console.log("coucou waiting...");

  await new Promise(r => setTimeout(r, 2500));

  console.log("done");
}

run();
