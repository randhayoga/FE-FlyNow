import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const PassengerInput = ({ label, value, min, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <FormLabel>{label}</FormLabel>
      <Button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value === min}
      >
        -
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-20 text-center ps-7"
        readOnly
      />
      <Button
        type="button"
        onClick={() => onChange(value + 1)}
      >
        +
      </Button>
    </div>
  )
}

export default PassengerInput