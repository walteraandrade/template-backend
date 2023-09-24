type LoggerMessageType = 'default' | 'error' | 'warning' 

const eightBitColor = {
    cyan: '\x1b[36m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m'
}

const loggerMessageTypeMapper: Record<LoggerMessageType, string> = {
    default: eightBitColor.cyan,
    error: eightBitColor.red,
    warning: eightBitColor.yellow
}

export function logger(logMessage: string, type?: LoggerMessageType): void {  console.log(loggerMessageTypeMapper[type ?? 'default'], logMessage) }