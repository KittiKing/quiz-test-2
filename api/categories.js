export default class Category {
  constructor(json = {}) {
    this.json = json
  }

  static async index() {
    const response = await fetch('https://api.publicapis.org/categories')
    if (response.status === 200) {
      const data = await response.json()
      return data
    }
  }
}
