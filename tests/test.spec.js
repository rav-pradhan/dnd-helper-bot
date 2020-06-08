import test from 'ava'
import { themes } from '../src/themes/themes'

test('themes', t => {
  t.is(Object.keys(themes).length > 0, true, "there are themes present in the themes object")
})
