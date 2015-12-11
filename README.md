# Closest Color

[Closest Color] finds the closest color to any hex you type.

![Screenshot][Screenshot]

## Install

[Closest Color] may be installed to the command line and then used as `closestcolor` or `ccolor`.

```sh
npm install -g closest-color
```

## Usage

```sh
closestcolor ff3
# prints: Electric Yellow (#ffff33)
```

### Options

#### name

```sh
closestcolor ff3 name
# prints: Electric Yellow
```

#### hex

```sh
closestcolor ff3 hex
# prints: #ffff33
```

#### contrast

```sh
closestcolor ff3 contrast
# prints: black
```

#### all

```sh
closestcolor ff3 all
# prints:
#   name:     Electric Yellow
#   hex:      #ffff33
#   contrast: black
```

[Closest Color]: https://github.com/jonathantneal/closest-color
[Screenshot]: screenshot.png
