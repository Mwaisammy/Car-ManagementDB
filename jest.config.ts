import { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest', //test using ts
    testEnvironment: 'node', //env test
    verbose: true,//show individual test results
    
}

export default config

