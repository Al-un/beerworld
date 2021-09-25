import { Component, Prop, Vue } from "vue-property-decorator";

import { Beer } from "@/models/beers";
import BeerGridItem from "./BeerGridItem.vue";

@Component({ components: { BeerGridItem } })
export default class BeerGrid extends Vue {
  @Prop({ type: Array, required: true })
  readonly beers!: Beer[];

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean;

  get beersCount(): number {
    return this.beers.length;
  }
}
