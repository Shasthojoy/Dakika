<template>

    <div>

        <div class="ui form" style="padding-left: 1px; padding-right:1px; padding-top: 5px; padding-bottom: 8px; ">
            <div class=" field">
                <div class="ui mini icon input">
                    <input :disabled="filename == null ? true : false" v-on:keyup.enter="addAttendant"
                           v-model="attendant" type="text" placeholder="Add Attendants">
                    <i class="add user icon"></i>
                </div>
            </div>
        </div>
        <div class="" style="overflow-y: auto;height: 100%; width: 299px; position: fixed; padding-bottom: 150px;">
            <div class="ui middle aligned selection list">
                <attendant :attendant="attendant" v-on:delete-item="deleteItem" v-on:user-present="userPresence"
                           v-for="attendant in attendants"></attendant>
            </div>
        </div>


    </div>


</template>

<script>
    /* eslint-disable indent */

    import Attendant from './AttendantItem.vue'
    export default {
      props: ['minutes', 'saved_attendants', 'filename'],
      components: {
        Attendant
      },
      data: function () {
        return {
          attendants: [],
          attendant: '',
          autoSave: ''
        }
      },
      mounted: function () {

      },
      methods: {
        deleteItem: function (item) {
          var index = this.attendants.indexOf(item)
          if (index > -1) {
            this.attendants.splice(index, 1);
          }
        },
        createAcronym: function (str) {
          var matches = str.match(/\b(\w)/g)              // ['J','S','O','N']
          return matches.join('')
        },
        userPresence: function (item) {
          var index = this.attendants.indexOf(item)
          if (index > -1) {
            this.attendants[index].present = !this.attendants[index].present
          }
        },
        addAttendant: function () {
          var acronym = this.createAcronym(this.attendant)
          var attendantObject = {
            attendant: this.attendant,
            acronym: acronym,
            email: 'email@example.com',
            present: true
          }
          this.attendants.push(attendantObject)
          this.$emit('input', this.attendants)
          this.attendant = ''
        },
        deleteattendant: function () {

        },
        editLastAttendant: function () {
          this.attendant = this.attendants.slice(-1)[0].attendant
        }
      },
      watch: {
        saved_attendants: function () {
          this.attendants = this.saved_attendants
        }
      }
    }
</script>

<style>

</style>
