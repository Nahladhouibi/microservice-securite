param (
    [string]$dbHost = "localhost",
    [int]$dbPort = 5432
)

$maxRetries = 15
$retries = 0
$waitTime = 5

while ($retries -lt $maxRetries) {
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $tcpClient.Connect($dbHost, $dbPort)
        if ($tcpClient.Connected) {
            Write-Host "PostgreSQL is up - executing command"
            exit 0
        }
    } catch {
        Write-Host "PostgreSQL is unavailable - sleeping"
        Start-Sleep -Seconds $waitTime
    }
    $retries++
}

Write-Host "PostgreSQL did not become available in time"
exit 1
