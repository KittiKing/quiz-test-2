<template>
  <div>
    <Card>
      <h3 slot="title">
        {{ 'Categories' }}
      </h3>
      <Row type="flex" justify="center">
        <Col :xs="24" :sm="16">
          <Table border :columns="columns" :data="filterCategory"></Table>
        </Col>
        <Col :xs="24" :sm="8" style="text-align: center">
          <Input
            v-model="keywords"
            placeholder="Input Keyword"
            suffix="ios-search"
            style="width: 300px; position: fixed; top: 50%; margin-left: -140px"
            clearable
            @on-clear="fetchCategories"
            @keyup.enter.native="onSearch"
            @on-change="onSearch"
          />
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { map, lowerCase } from 'lodash'
import Category from '~/api/categories'
export default {
  data() {
    return {
      keywords: null,
      categories: [],
      filterCategory: [],
      columns: [
        {
          title: 'Category Name',
          key: 'category_name'
        }
      ]
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const response = await Category.index()
      this.categories = map(response, (category) => {
        const categoryJson = {}
        categoryJson.category_name = category
        return categoryJson
      })
      this.filterCategory = this.categories
    },
    onSearch() {
      if (this.keywords) {
        this.filterCategory = this.categories.filter((category) =>
          lowerCase(category.category_name).includes(lowerCase(this.keywords))
        )
      } else {
        this.fetchCategories()
      }
    }
  }
}
</script>
