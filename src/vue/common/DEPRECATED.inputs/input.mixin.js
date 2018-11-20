import { commonEvents } from '../../../js/events/common_events'

export default {
  props: {
    disabled: { type: Boolean, default: false },
    error: { type: [String, Boolean], default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    title: { type: String, default: '' },
    type: { type: String, default: 'text' },
    required: { type: Boolean, default: false },
    step: { type: Number, default: 0.000001 },
    min: { type: Number, default: 0 },
    value: { type: String, default: '' }
  },
  methods: {
    onInput (event) {
      this.$emit(commonEvents.inputEvent, event.target.value)
    },
    onKeypress (event) {
      if (this.type !== 'number') return
      this.$number.testNumber(event)
    }
  }
}
