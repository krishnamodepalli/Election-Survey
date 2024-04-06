
export class AgeWisePartyVotes {
  #sum = 0;
  constructor(teens, youngsters, adults, seniors) {
    this.teens = teens;
    this.youngsters = youngsters;
    this.adults = adults;
    this.seniors = seniors;

    this.#sum = this.teens + this.youngsters + this.adults + this.seniors;
  };
  sum() {
    return this.#sum;
  }
}
