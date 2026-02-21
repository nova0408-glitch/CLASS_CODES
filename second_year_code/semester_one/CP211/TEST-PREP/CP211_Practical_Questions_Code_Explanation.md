# CP211 Practical Test (2025/2026) — Full Code + Command/Flag Explanations

This file explains each question script (`q1.sh` to `q10.sh`) in detail, including:
- what each command does,
- what each flag means in that command,
- and a simpler version of each solution in `simpler_scripts/`.

> Question alignment source: `CP 211 Practical Test Questions 2025_2026.pdf` (same folder).

---

## Common Bash lines used in the main solutions

```bash
#!/usr/bin/env bash
set -euo pipefail
```

### `#!/usr/bin/env bash`
- `#!` = shebang; tells Linux which interpreter to use.
- `/usr/bin/env bash` = locate `bash` from current environment PATH.

### `set -euo pipefail`
- `-e` → exit immediately if a command fails (non-zero status).
- `-u` → error on undefined variables.
- `-o pipefail` → in a pipeline, fail if any stage fails (not only the last one).

---

## Q1 — Save user + system info to a file

### Main script: `cp211_practical_solutions/q1.sh`

Commands used:
- `whoami`
  - prints current logged-in username.
  - no flags used.
- `pwd`
  - prints current working directory.
  - no flags used.
- `date '+%Y-%m-%d %H:%M:%S'`
  - prints formatted date/time.
  - format tokens:
    - `%Y` 4-digit year
    - `%m` month
    - `%d` day
    - `%H` hour (24h)
    - `%M` minute
    - `%S` second
- redirection block `{ ... } > "$output_file"`
  - sends all block output into file (overwrite mode).
- `wc -l < "$output_file"`
  - `wc` = word/line/byte count tool.
  - `-l` = count lines only.

### Simpler version
- `simpler_scripts/q1_simple.sh`
- Uses `echo ... > file` then `>>` append style for readability.

---

## Q2 — Ask for username and show account details if it exists

### Main script: `cp211_practical_solutions/q2.sh`

Commands used:
- `read -r -p "Enter username: " username`
  - `read` gets input from user.
  - `-r` = raw input (do not treat backslashes specially).
  - `-p` = prompt text shown before input.
- `awk -F: ... /etc/passwd`
  - `awk` processes text by fields.
  - `-F:` sets field separator to `:`.
  - `/etc/passwd` stores local user records.
- `id "$username"`
  - shows UID, GID, and groups for that user.

### Simpler version
- `simpler_scripts/q2_simple.sh`
- Uses `grep -q "^$username:" /etc/passwd`:
  - `-q` quiet mode (no output, only exit code).
  - `^$username:` anchors match at line start for exact username field.

---

## Q3 — Create group and add user to group

### Main script: `cp211_practical_solutions/q3.sh`

Commands used:
- `[[ $EUID -ne 0 ]]`
  - checks current effective user ID is not root.
  - `-ne` means “not equal” (numeric comparison).
- `getent passwd "$username"`
  - queries system account databases (more reliable than only `/etc/passwd`).
  - `passwd` database + username key.
- `getent group "$group_name"`
  - checks if group exists.
- `groupadd "$group_name"`
  - creates new group.
- `usermod -aG "$group_name" "$username"`
  - `-a` append (keep existing memberships).
  - `-G` supplementary groups list.
- `id -nG "$username"`
  - `-n` print names (not numeric IDs).
  - `-G` print all group IDs/names for user.

### Simpler version
- `simpler_scripts/q3_simple.sh`
- Basic flow with fewer checks (assumes valid user + sudo execution).

---

## Q4 — Create file and set permissions

### Main script: `cp211_practical_solutions/q4.sh`

Commands used:
- `: > "$file_name"`
  - `:` is no-op built-in; with redirection it creates/truncates file.
- `chmod 740 "$file_name"`
  - `740` means:
    - owner `7` = rwx
    - group `4` = r--
    - others `0` = ---
- `ls -l "$file_name"`
  - `-l` long listing (permissions, owner, size, date).

### Simpler version
- `simpler_scripts/q4_simple.sh`
- Uses `touch` + `chmod 740` + `ls -l`.

---

## Q5 — File statistics + lines containing “Linux”

### Main script: `cp211_practical_solutions/q5.sh`

Commands used:
- `[[ -f "$file_name" ]]`
  - `-f` true if path is an existing regular file.
- `wc -l < "$file_name"`
  - `-l` line count.
- `wc -w < "$file_name"`
  - `-w` word count.
- `grep -in "Linux" "$file_name"`
  - `-i` case-insensitive search.
  - `-n` show line numbers.

### Simpler version
- `simpler_scripts/q5_simple.sh`
- Runs `wc` and `grep` directly (no pre-validation).

---

## Q6 — Parse `/etc/passwd` for user reports

### Main script: `cp211_practical_solutions/q6.sh`

Commands used:
- `cut -d: -f1 /etc/passwd`
  - `-d:` delimiter is `:`.
  - `-f1` extract first field (username).
- `sort`
  - sorts lines alphabetically.
- `wc -l`
  - line count for total users.
- `awk -F: '$7 == "/bin/bash" {print $1}' /etc/passwd`
  - `-F:` delimiter is `:`.
  - condition checks shell field (7th field).
  - action prints username field (1st).

### Simpler version
- `simpler_scripts/q6_simple.sh`
- Same logic in a shorter script.

---

## Q7 — Backup all `.txt` files and create tar archive

### Main script: `cp211_practical_solutions/q7.sh`

Commands used:
- `mkdir -p "$backup_dir"`
  - `-p` create parent dirs if needed; no error if already exists.
- `shopt -s nullglob`
  - `-s` set shell option.
  - `nullglob` means unmatched `*.txt` expands to nothing (not literal text).
- `txt_files=(*.txt)`
  - bash glob to capture matching `.txt` files.
- `cp -- "${txt_files[@]}" "$backup_dir"/`
  - `--` marks end of options; protects filenames starting with `-`.
- `tar -cf "$archive_name" "$backup_dir"`
  - `-c` create archive.
  - `-f` use given filename.

### Simpler version
- `simpler_scripts/q7_simple.sh`
- Uses `cp *.txt backup/` and `tar -cvf ...`.
  - `-v` verbose listing while creating archive.

---

## Q8 — Show currently logged-in users and count

### Main script: `cp211_practical_solutions/q8.sh`

Commands used:
- `who`
  - shows active login sessions.
- `awk '{print $1}'`
  - prints first column (username).
- `sort -u`
  - `-u` unique only.
- `mapfile -t users < <(...)`
  - `mapfile` reads lines into array.
  - `-t` remove trailing newline from each line.

### Simpler version
- `simpler_scripts/q8_simple.sh`
- Uses two pipelines: one for list, one for count.

---

## Q9 — Integer arithmetic operations

### Main script: `cp211_practical_solutions/q9.sh`

Commands used:
- `read -r -p ...`
  - same meanings as Q2 (`-r`, `-p`).
- regex check with `[[ ! $a =~ ^-?[0-9]+$ ]]`
  - `^-?` optional minus sign.
  - `[0-9]+` one or more digits.
  - `$` end of string.
- arithmetic expansion `$(( ... ))`
  - performs integer math in bash.
- `if ((b == 0)); then`
  - arithmetic test context to avoid divide-by-zero.

### Simpler version
- `simpler_scripts/q9_simple.sh`
- Direct calculations with no validation.

---

## Q10 — Print star triangle pattern

### Main script: `cp211_practical_solutions/q10.sh`

Commands used:
- `read -r -p ... n`
  - input for number of lines.
- regex `^[0-9]+$`
  - numeric only (no sign).
- `((n <= 0))`
  - arithmetic condition for positivity check.
- `for ((i = 1; i <= n; i++))`
  - C-style loop from 1 to n.
- `line+="*"`
  - append one `*` each iteration.

### Simpler version
- `simpler_scripts/q10_simple.sh`
- Uses nested loops and `printf "*"`.
  - `printf` prints without automatic newline (unlike `echo`).

---

## New folder: `simpler_scripts/`

Included files (one per question):
- `q1_simple.sh`
- `q2_simple.sh`
- `q3_simple.sh`
- `q4_simple.sh`
- `q5_simple.sh`
- `q6_simple.sh`
- `q7_simple.sh`
- `q8_simple.sh`
- `q9_simple.sh`
- `q10_simple.sh`

These are intentionally easier to read and map directly to the CP211 practical prompts, while the original scripts stay safer and more production-friendly.

---

## Quick run

```bash
cd second_year_code/semester_one/CP211/TEST-PREP/simpler_scripts
chmod +x q*_simple.sh
./q1_simple.sh
```

For Q3 (group/user change), run with sudo:

```bash
sudo ./q3_simple.sh
```
