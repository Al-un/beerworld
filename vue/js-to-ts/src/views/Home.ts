import { Component, Vue } from "vue-property-decorator";

import BeerGrid from "@/components/BeerGrid.vue";
import { Beer } from "@/models/beers";
import { beerModule } from "@/store/module-definitions";

@Component({
  components: { BeerGrid },
})
export default class Home extends Vue {
  get beers(): Beer[] {
    return beerModule(this.$store).beers;
  }

  get loadingBeers(): boolean {
    return beerModule(this.$store).loading;
  }

  async mounted() {
    await beerModule(this.$store).fetchBeers();
  }
}
