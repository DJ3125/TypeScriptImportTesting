param(
  [Parameter(Mandatory)][int32]$Port
)

write-host "Compiling..."
npx tsc
write-host "Finished Compiling"
write-host "Running Server on port" $Port
"http://localhost:", $Port -join "" | write-host
write-host "All Set! Enjoy!!!"
node out/index.js $Port