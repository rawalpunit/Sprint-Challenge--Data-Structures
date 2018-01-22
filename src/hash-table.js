/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }
  // This is the hashnode function which does the linked list implementation of a Hash Table
  hashNode(key, value, next) {
    this.key = key,
    this.value = value,
    this.head = null,
    this.tail = null,
    this.next = next || null;
  }
  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucketIndex = this.storage.get(index);
    // check to see if bucketIndex exists..if it doesn't...add a new head node for a linkedlist there
    if (bucketIndex === undefined) {
      this.storage[bucketIndex] = new hashNode(key, value);
    }
    // Now to check is key exists...if it does..update value associated with it..if key don't exist..add node
    let currentNode = this.storage[bucketIndex];
    while (currentNode.next !== null) {
        if (currentNode.key === key) {
            currentNode.value = value;
            return;
        }
        currentNode = currentNode.next;
    }
    currentNode.next = new hashNode(key, value);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucketIndex = this.storage.get(index);
    if (bucketIndex === undefined) {
      return;
    }
    let previousNode = this.head;
    let currentNode = previousNode.next;
    if (previousNode.key === key ) this.head = this.head.next;
    while (currentNode) {
        if (currentNode.key === key) {
            previousNode.next = currentNode.next;
        }
        currentNode = currentNode.next;
    }
    return null;
}
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucketIndex = this.storage.get(index);
    if (bucketIndex === undefined) {
      return;
    }
    let currentNode = bucketIndex;
    while (currentNode) {
        if (currentNode.key === key) return currentNode.value;
        currentNode = currentNode.next;
    }
    return null;
  }
}

module.exports = HashTable;
