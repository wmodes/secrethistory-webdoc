
// executing commands on the server

exec = Npm.require('child_process').exec;

// From https://gentlenode.com/journal/meteor-14-execute-a-unix-command/33
runCommand = function (error, stdout, stderr) {
    if (stdout && debug) console.log('stdout: ' + stdout);
    if (stderr && debug) console.log('stderr: ' + stderr);
    if (error && debug) console.log('exec error: ' + error);
}
