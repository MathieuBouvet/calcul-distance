function run(asyncFn: () => Promise<any>) {
  asyncFn()
    .then(() => {
      console.log("done");
      process.exit(0);
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

export default run;
