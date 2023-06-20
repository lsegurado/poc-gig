import { Box, TextField, Autocomplete, AutocompleteProps, TextFieldProps } from '@mui/material';
import { Country, getData } from 'country-list';
import { FC } from 'react';

const countries = getData()

export interface CountrySelectProps extends Partial<AutocompleteProps<Country, false, false, false, 'div'>> {
  textFieldProps: TextFieldProps 
}

export const CountrySelect: FC<CountrySelectProps> = ({textFieldProps, ...props}) => (
  <Autocomplete
    {...props}
    autoHighlight
    getOptionLabel={(option) => option.name}
    isOptionEqualToValue={(option, value) => option.code === value?.code}
    value={props.value}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <img
          loading="lazy"
          width="20"
          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          alt={`Flag ${option.name}`}
        />
        {option.name} ({option.code})
      </Box>
    )}
    options={countries}
    renderInput={(params) => (
      <TextField
        {...params}
        {...textFieldProps}
        label="Choose a country"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password', // disable autocomplete and autofill
        }}
      />
    )}
  />
);

