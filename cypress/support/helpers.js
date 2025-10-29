

import { faker } from '@faker-js/faker' 


export function getTimeStamp() {
    //return faker.number.hex({ min: 10, max: 65535 })
    return faker.number.bigInt()
}

export function getRandomEmail() {
    //return `qa-tester-${getTimeStamp()}@test.com`
    return faker.internet.email({firstName: 'qa-teste'})

}


//pode tanto usar o export conforme abaixo, colocando todas as funções, ou pode colocar antes de cada função,  o export
//export default helpers
