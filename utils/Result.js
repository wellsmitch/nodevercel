class Result {
 constructor(props) {
  this.info = props || {}
 }
 getResult() {
  const { status, message,data } = this.info || {}
  if (this.info > 300) {
   return {
    status,
    message,
   }
  } else {
   return {
    message,
    ...data?data:this.info
   }
  }

 }
}

module.exports = Result