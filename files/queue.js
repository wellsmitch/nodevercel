function  createPromiseQueue(size,maxRetries=3) {
    const queue = []
    const results = []
    let activeCount = 0
    let totalTasks = 0
    let completedTasks = 0
    let resolveAll
    const allPromise=new Promise(resolve=>{
        resolveAll = resolve
    })
    async function enqueue(promiseGenerator) {
        totalTasks++;
        while(activeCount>=size){
            const dc = await Promise.race(queue)
            console.log('123',dc)
        }
        activeCount++
        let retries = 0;
        const attemptPromise=()=> {
            return promiseGenerator()
            .then(d=> {
                const result = d.data
                results.push(result)
                return result
            })
            .catch(error=> {
                if(retries<maxRetries) {
                    retries++
                    return attemptPromise()
                }
            }).finally(()=> {
                activeCount--;
                completedTasks++;
                const ind = queue.indexOf(promise)
                queue.splice(ind, 1);
                if(completedTasks === totalTasks) {

                    resolveAll(results)
                }
            })

    
        }
        const promise = attemptPromise()
        queue.push(promise)
        return promise
    }

    async function all() {
        await allPromise;
        return results
    }

    return {
        enqueue,
        all
    }
}