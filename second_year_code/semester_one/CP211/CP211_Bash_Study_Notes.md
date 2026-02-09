# CP211 Bash Scripting Study Notes

> Focus area: CP211 folder examples (MONDAY, MONDAY-2, SATURDAY) + exam-ready Bash notes.

## 1) Commands used in the CP211 folders (from the provided scripts)

### MONDAY folder
These scripts demonstrate:
- `echo` for output (`script1.sh`, `script3.sh`, `script4.sh`, `script5.sh`)
- Variable assignment and environment variables (`script3.sh`, `script4.sh`)
- File creation/permissions and execution (`script5.sh`):
  - `echo 'text' > file` (create/overwrite)
  - `echo 'text' >> file` (append)
  - `chmod 700 file` (set permissions)
- `./file` (execute)

**Quick explanations of each script:**
- `script1.sh` prints a simple intro message using `echo`.
- `script2.sh` prints the current shell options using `$-`.
- `script3.sh` shows variable assignment and prints environment values like `$USER`.
- `script4.sh` prints the current working directory (`$PWD`) and host name (`$HOSTNAME`).
- `script5.sh` builds a tiny script file (`hello`) using redirection, makes it executable with `chmod`, then runs it.

### MONDAY-2 folder
These scripts demonstrate:
- User input: `read -p "prompt" var` (`if1.sh`, `if3.sh`, `while1.sh`)
- Conditionals with `if` and `else` (`if1.sh`, `if2.sh`, `if3.sh`, `if4.sh`)
- Checking a user in `/etc/passwd` with `grep -q` (`if2.sh`, `if3.sh`)
- Logical OR in `[[ ... ]]` tests (`if4.sh`)
- Looping:
  - `for user in $users` (`if5.sh`)
  - Brace expansion `for num in {1..10}` (`if6.sh`)
  - Sequence generation `seq` (`if9.sh`)
  - `while` loops (`while.sh`, `while1.sh`)
  - `until` loops (`until.sh`)
- Loop control:
  - `break` example (`break.sh`)
  - `continue` example (`continue.sh`)
- File creation inside a loop: `touch assignment$arg` (`if9.sh`)

**Quick explanations of each script:**
- `if1.sh` reads a greeting and compares it to `"hello"`.
- `if2.sh` checks if a username (passed as `$1`) exists in `/etc/passwd`.
- `if3.sh` is the interactive version of `if2.sh` (reads username from input).
- `if4.sh` demonstrates logical OR: allows access if user is admin **or** if UID is 0.
- `if5.sh` loops over a string list of usernames and prints each one.
- `if6.sh` loops from 1 to 10 using brace expansion.
- `if7.sh` shows different list styles in a `for` loop (note: brace expansion is not used here).
- `if8.sh` is a duplicate of `if7.sh` (same loop examples).
- `if9.sh` creates files `assignment1` to `assignment4` using `seq` + `touch`.
- `while.sh` counts from 1 to 10 using a `while` loop.
- `while1.sh` keeps asking for a name until the user enters a non-empty value.
- `until.sh` counts down to 0 using `until`.
- `break.sh` demonstrates `break` inside nested loops (note: variable case is inconsistent in the script).
- `continue.sh` skips printing `"HIS"` values using `continue`.

### SATURDAY folder
- Positional parameters and script name:
  - `$#` (number of arguments)
  - `$1`, `$2` (first/second argument)
  - `$0` (script name)

**Quick explanation of the script:**
- `file10.sh` shows how to read and echo positional parameters and the script name.

---

## 2) Bash scripting essentials (exam notes)

### 2.1 Variables
**Rules:**
- No spaces around `=` during assignment.
- Use quotes to preserve spaces.
- Use `${var}` when concatenating.

```bash
name="Ada Lovelace"
age=19
school=KNUST

echo "Name: $name"
echo "Age: ${age}"
```

**Special variables:**
- `$0`: script name
- `$1..$9`: positional arguments
- `$#`: number of arguments
- `$?`: exit status of last command
- `$$`: current process ID

### 2.2 Reading input
```bash
read -p "Enter your name: " username
read -s -p "Password: " password
```

### 2.3 Functions
**Definition and call:**
```bash
greet() {
  echo "Hello, $1"
}

greet "Class Two"
```

**Returning values:**
- Use `echo` and capture with command substitution.
- Or set a global variable.

```bash
sum() {
  echo $(( $1 + $2 ))
}

result=$(sum 5 7)
echo "Result: $result"
```

### 2.4 Passing arguments
**To scripts:**
```bash
# file: fruits.sh
#!/bin/bash
echo "Total: $#"
echo "First: $1"

# run:
./fruits.sh mango apple
```

**To functions:**
```bash
show_args() {
  echo "Function name: ${FUNCNAME[0]}"
  echo "Arg count: $#"
  echo "Arg1: $1"
}

show_args "one" "two"
```

### 2.5 Conditionals and logical control
**If/else:**
```bash
if [[ -f "$file" ]]; then
  echo "File exists"
else
  echo "Missing file"
fi
```

**Numeric comparisons (inside `(( ))` or `[[ ]]`):**
- `-eq` equal
- `-ne` not equal
- `-lt` less than
- `-le` less or equal
- `-gt` greater than
- `-ge` greater or equal

**Logical operators:**
- `&&` AND
- `||` OR
- `!` NOT

```bash
if [[ "$user" == "admin" ]] || [[ "$EUID" -eq 0 ]]; then
  echo "Access granted"
fi
```

### 2.6 Case statements
```bash
read -p "Choose (start|stop|restart): " action
case "$action" in
  start) echo "Starting" ;;
  stop) echo "Stopping" ;;
  restart) echo "Restarting" ;;
  *) echo "Unknown option" ;;
esac
```

### 2.7 Flow control (loops)
**for:**
```bash
for user in ada bob carl; do
  echo "$user"
done
```

**while:**
```bash
count=1
while [[ $count -le 3 ]]; do
  echo $count
  ((count++))
done
```

**until:**
```bash
count=3
until [[ $count -le 0 ]]; do
  echo $count
  ((count--))
done
```

**break / continue:**
```bash
for i in 1 2 3 4 5; do
  if [[ $i -eq 3 ]]; then
    continue
  fi
  if [[ $i -eq 5 ]]; then
    break
  fi
  echo $i
done
```

---

## 3) Strict Bash syntax rules to remember
- **Shebang required:** `#!/bin/bash` at top of file.
- **No spaces around `=`** in assignments (`x=10`, not `x = 10`).
- **Use `[[ ... ]]`** for safer tests (string comparisons, regex, etc.).
- **Quote variables** to avoid word-splitting: `"$var"`.
- **Comments** start with `#`.
- **End `if` with `fi`, `case` with `esac`, loops with `done`.
- **Use `;` or newline** before `then` in single-line `if`.
- **Executable permission:** `chmod +x script.sh` and run `./script.sh`.

---

## 4) Quick cheat codes (common one-liners)
- `chmod +x file.sh` — make script executable
- `./file.sh arg1 arg2` — run with arguments
- `bash -x file.sh` — debug with trace
- `set -e` — exit on error
- `set -u` — error on unset variables
- `set -o pipefail` — fail on pipeline errors
- `which bash` — show bash path
- `echo $?` — exit status of last command

---

## 5) Advanced text processing (grep, sed, awk)

### grep (search/filter lines)
```bash
# Find lines containing "root" in /etc/passwd
grep "root" /etc/passwd

# Quiet check (exit code only), useful in if-statements
grep -q "$username" /etc/passwd

# Case-insensitive search
grep -i "error" logfile.txt

# Show line numbers
grep -n "TODO" *.sh
```

### sed (stream editor: find/replace, delete, print)
```bash
# Replace first occurrence of "old" with "new" on each line
sed 's/old/new/' file.txt

# Replace all occurrences (global)
sed 's/old/new/g' file.txt

# Print only lines 5-10
sed -n '5,10p' file.txt

# Delete blank lines
sed '/^$/d' file.txt
```

### awk (field-based processing)
```bash
# Print the first and third fields from a file (space-delimited)
awk '{print $1, $3}' file.txt

# Use a different delimiter (e.g., :)
awk -F: '{print $1, $7}' /etc/passwd

# Filter by numeric condition
awk '$3 > 1000 {print $1, $3}' /etc/passwd
```

**Exam tips for grep/sed/awk:**
- `grep` is best for quick matching and filtering lines.
- `sed` excels at in-place-style text transforms (think “search/replace”).
- `awk` is best for column/field processing and simple reports.

---

## 6) Typical script template (best practice)
```bash
#!/bin/bash
set -euo pipefail

usage() {
  echo "Usage: $0 <arg1> <arg2>"
}

if [[ $# -lt 2 ]]; then
  usage
  exit 1
fi

arg1=$1
arg2=$2

echo "Arg1: $arg1"
echo "Arg2: $arg2"
```
