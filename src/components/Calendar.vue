<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="yellow">
          <v-btn color="primary" dark @click.stop="dialog = true">
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
            
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
             
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
               <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-radio-group v-model="ex7" column>
              
              <v-radio
                label="Bad"
                color="blue"
                value="blue"
              ></v-radio>
              <v-radio
                label="Awful"
                color="purple"
                value="purple"
              ></v-radio>
              <v-radio
                label="Good"
                color="yellow"
                value="yellow"
              ></v-radio>
               <v-radio
                label="Great"
                color="green"
                value="green"
              ></v-radio>
              
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-radio-group v-model="ex8" column>
              
              
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
           
              <v-text-field v-model="name" type="text" label="I feel (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="Because of"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDate" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
                <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-radio-group v-model="ex7" column>
              
              <v-radio
                label="Bad"
                color="blue"
                value="blue"
              ></v-radio>
              <v-radio
                label="Awful"
                color="purple"
                value="purple"
              ></v-radio>
              <v-radio
                label="Good"
                color="yellow"
                value="yellow"
              ></v-radio>
               <v-radio
                label="Great"
                color="green"
                value="green"
              ></v-radio>
              
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-radio-group v-model="ex8" column>
              
              
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
              
               <v-text-field v-model="name" type="text" label="I feel (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="Because of"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
          
                 create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

<v-sheet height="600">
  <v-calendar
  ref="calendar"
  v-model="focus"
  color="primary"
  :events="events"
  :event-color="getEventColor"
  :event-margin-bottom="3"
  :now="today"
  :type="type"
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="setDialogDate"
  @change="updateRange"
  ></v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  full-width
  offset-x
  >
  <v-card color="grey lighten-4" :width="350" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn @click="deleteEvent(selectedEvent.id)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <form v-if="currentlyEditing !== selectedEvent.id">
        {{ selectedEvent.details }}
      </form>
      <form v-else>
        <textarea-autosize
        v-model="selectedEvent.details"
        type="text"
        style="width: 100%"
        :min-height="100"
        placeholder="add note">
      </textarea-autosize>
    </form>
  </v-card-text>

  <v-card-actions>
    <v-btn text color="secondary" @click="selectedOpen = false">
      close
    </v-btn>
    <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
      edit
    </v-btn>
    <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
      Save
    </v-btn>
  </v-card-actions>
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</template>

<script>
import { db } from '@/main'
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false
  }),
  mounted () {
    this.getEvents();
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
      
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  methods: {
    async getEvents () {
      let snapshot = await db.collection('EventCal').get()
      const events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events;
    },
    setDialogDate( { date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async addEvent () {
      if (this.name && this.start && this.end) {
        await db.collection("EventCal").add({
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color
        })
        this.getEvents()
        this.name = '',
        this.details = '',
        this.start = '',
        this.end = '',
        this.color = ''
      } else {
        alert('You must enter event name, start, and end time')
      }
    },
    editEvent (event) {
      this.currentlyEditing = event.id
    },
    async updateEvent (event) {
      await db.collection('EventCal').doc(this.currentlyEditing).update({
        details: event.details
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteEvent (event) {
      await db.collection("EventCal").doc(event).delete()
      this.selectedOpen = false,
      this.getEvents()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}
</script>
