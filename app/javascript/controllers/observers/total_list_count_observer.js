class TotalListCountObserver {
  static monitor(itemsListElem, totalItemsCount) {
    const config  = { attributes: true, subtree: true, childList: true };
    this.observer = new MutationObserver((mutationList, {}) => {
      for (let mutation of mutationList) {
        if (mutation.type === 'childList') {
          totalItemsCount.textContent = itemsListElem.querySelectorAll('li').length
        }
      }
    });
    
    this.observer.observe(itemsListElem, config)
  }
  
  static forget() {
    this.observer.disconnect();
  }
}

export default TotalListCountObserver;