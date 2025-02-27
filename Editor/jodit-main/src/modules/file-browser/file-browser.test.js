/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

('filebrowser' in window.skipTest ? describe.skip : describe)(
	'Jodit FileBrowser Tests',
	() => {
		afterEach(() => {
			defaultPermissions.permissions.allowFileRemove = true;
		});

		describe('Constructor/Destructor', function () {
			describe('Without Jodit', function () {
				it('Should create dialog and load files', function () {
					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					filebrowser.open(function () {});

					expect(
						document.querySelectorAll('.jodit-dialog').length
					).equals(1);

					filebrowser.close();

					expect(
						document.querySelectorAll('.jodit-dialog').length
					).equals(0);

					filebrowser.destruct();
				});
			});

			it('Should create dialog and load files', function () {
				const editor = getJodit({
					filebrowser: {
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					}
				});

				const filebrowser = new Jodit.modules.FileBrowser(
					editor.o.filebrowser
				);
				filebrowser.open(function () {});

				expect(
					editor.ownerDocument.querySelectorAll('.jodit-dialog')
						.length
				).equals(1);

				filebrowser.destruct();
			});

			it('Should add filebrowser icon in image buttons popup', function () {
				const editor = getJodit({
					filebrowser: {
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					}
				});

				clickButton('image', editor);

				expect(
					getOpenedPopup(editor)
						.querySelector('[aria-pressed="true"]')
						.innerText.trim()
				).equals('Browse');
			});

			it('Should add uploader icon in image buttons popup', function () {
				const editor = getJodit({
					uploader: {
						url: 'https://xdsoft.net/jodit/connector/index.php?action=upload'
					},
					filebrowser: {
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					}
				});

				clickButton('image', editor);

				expect(
					getOpenedPopup(editor)
						.querySelector('[aria-pressed="true"]')
						.innerText.trim()
				).equals('Upload');
			});

			describe('Without folders panel', function () {
				it('Should create dialog and load files', function (done) {
					const editor = getJodit({
						filebrowser: {
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							},
							showFoldersPanel: false
						}
					});

					const filebrowser = editor.filebrowser;

					filebrowser
						.open(function () {})
						.then(function () {
							const files = filebrowser.browser.querySelector(
								'.' + filebrowser.files.componentName
							);

							expect(files).is.not.null;

							expect(
								files.querySelector(
									'.' +
										filebrowser.files.getFullElName(
											'item'
										) +
										' img[data-src="https://xdsoft.net/jodit/files/images.jpg"]'
								)
							).is.not.null;

							done();
						})
						.catch(function (e) {
							throw e;
						});
				});
			});
		});

		describe('Change Ajax options', function () {
			describe('Use GET method instead POST', function () {
				it('Should add params into url instead body', function (done) {
					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php',
							method: 'GET'
						}
					});

					filebrowser
						.open(function () {})
						.then(function () {
							Jodit.modules.Ajax.log.forEach(function (req) {
								expect(req.url).to.be.match(/\?action/);
							});

							filebrowser.destruct();
							done();
						})
						.catch(function (e) {
							throw e;
						});
				});
			});

			describe('Expand AJAX options', () => {
				it('Should not change other default options', () => {
					unmockPromise();

					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php',
							method: 'GET'
						}
					});

					filebrowser.dataProvider.get('permissions');

					const perm =
						filebrowser.dataProvider.__ajaxInstances.get(
							'permissions'
						);
					expect(perm.options.headers).deep.equals({});
					expect(perm.options.successStatuses).deep.equals([
						200, 201, 202
					]);
					filebrowser.destruct();
				});
			});

			describe('Use POST method', function () {
				it('Should add params only into body', function (done) {
					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php',
							method: 'POST'
						}
					});

					filebrowser
						.open(function () {})
						.then(function () {
							Jodit.modules.Ajax.log.forEach(function (req) {
								expect(req.url).equals(
									'https://xdsoft.net/jodit/connector/index.php'
								);
							});

							filebrowser.destruct();
							done();
						})
						.catch(function (e) {
							throw e;
						});
				});
			});
		});

		describe('Toolbar', function () {
			describe('Permissions', () => {
				it('Should show allowed buttons', async () => {
					const fileBrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					await fileBrowser
						.open(() => {})
						.then(() => {
							expect(getButton('remove', fileBrowser.toolbar)).to
								.be.not.null;
						});

					fileBrowser.destruct();
				});

				describe('Disable permissions', () => {
					it('Should show only allowed buttons', async () => {
						const fileBrowser = new Jodit.modules.FileBrowser({
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							},
							permissionsPresets: {
								allowFileRemove: false
							}
						});

						await fileBrowser
							.open(() => {})
							.then(() => {
								expect(getButton('remove', fileBrowser.toolbar))
									.to.be.null;
							});

						fileBrowser.destruct();
					});

					describe('Changed from server', () => {
						it('Should show only allowed buttons', async () => {
							unmockPromise();
							const fileBrowser = new Jodit.modules.FileBrowser({
								ajax: {
									url: 'https://xdsoft.net/jodit/connector/index.php'
								}
							});

							await fileBrowser
								.open(() => {})
								.then(async () => {
									defaultPermissions.permissions.allowFileRemove = false;
									await fileBrowser.dataProvider.permissions(
										'',
										''
									);
									expect(
										getButton('remove', fileBrowser.toolbar)
									).to.be.null;
								});

							fileBrowser.destruct();
						});
					});
				});
			});

			describe('Without Jodit', function () {
				it('Should create filebrowser and show standart toolbar', function (done) {
					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					filebrowser
						.open(function () {})
						.then(function () {
							expect(
								filebrowser._dialog.dialogbox_header.querySelectorAll(
									'.jodit-toolbar-button,.jodit-toolbar-content'
								).length
							).equals(9);

							filebrowser.close();
							filebrowser.destruct();

							done();
						})
						.catch(function (e) {
							throw e;
						});
				});
			});

			describe('Disable buttons', function () {
				describe('Edit button', function () {
					it('Should be disabled while not selected some image', function (done) {
						const filebrowser = new Jodit.modules.FileBrowser({
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						});

						filebrowser
							.open(function () {})
							.then(function () {
								const edit = getButton(
									'edit',
									filebrowser._dialog.dialogbox_header
								);
								expect(edit).is.not.null;
								expect(edit.hasAttribute('disabled')).is.true;

								simulateEvent(
									'click',
									filebrowser.browser.querySelector(
										'.' +
											filebrowser.files.getFullElName(
												'item'
											) +
											'[data-is-file="0"]'
									)
								);

								expect(edit.hasAttribute('disabled')).is.false;

								filebrowser.close();
								filebrowser.destruct();

								done();
							})
							.catch(function (e) {
								throw e;
							});
					});

					it('Should be disabled if selected more then 1 image or some file', function (done) {
						const filebrowser = new Jodit.modules.FileBrowser({
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						});

						filebrowser
							.open(function () {})
							.then(function () {
								const edit = getButton(
									'edit',
									filebrowser._dialog.dialogbox_header
								);

								expect(edit.hasAttribute('disabled')).is.true;

								simulateEvent(
									'click',
									getFirstFBItem(filebrowser)
								);

								expect(edit.hasAttribute('disabled')).is.false;

								simulateEvent(
									'click',
									getFirstFBItem(filebrowser, 1),
									function (data) {
										data[
											!navigator.userAgent.indexOf(
												'Mac OS X'
											)
												? 'ctrlKey'
												: 'metaKey'
										] = true;
									}
								);

								expect(edit.hasAttribute('disabled')).is.true;

								filebrowser.close();
								filebrowser.destruct();

								done();
							})
							.catch(function (e) {
								throw e;
							});
					});

					describe('Allow all buttons if permission handle is not set', function () {
						describe('If deny remove action', function () {
							it('Should not use permission hash and canI method', function (done) {
								defaultPermissions.permissions.allowFileRemove = false;

								const filebrowser =
									new Jodit.modules.FileBrowser({
										ajax: {
											url: 'https://xdsoft.net/jodit/connector/index.php'
										}
									});

								filebrowser
									.open(function () {})
									.then(function () {
										const remove = getButton(
											'remove',
											filebrowser._dialog
										);
										expect(remove).is.not.null;
										expect(remove.hasAttribute('disabled'))
											.is.true;

										simulateEvent(
											'click',
											getFirstFBItem(filebrowser)
										);

										expect(remove.hasAttribute('disabled'))
											.is.true;

										filebrowser.close();
										filebrowser.destruct();

										done();
									})
									.catch(function (e) {
										throw e;
									});
							});
						});

						describe('If not set permission api option', function () {
							it('Should not use permission hash and canI method', function (done) {
								defaultPermissions.permissions.allowFileRemove = false;

								const filebrowser =
									new Jodit.modules.FileBrowser({
										ajax: {
											url: 'https://xdsoft.net/jodit/connector/index.php'
										},
										permissions: null
									});

								filebrowser
									.open(function () {})
									.then(function () {
										const remove = getButton(
											'remove',
											filebrowser._dialog
										);
										expect(remove).is.not.null;

										expect(remove.hasAttribute('disabled'))
											.is.true;

										simulateEvent(
											'click',
											getFirstFBItem(filebrowser)
										);

										expect(remove.hasAttribute('disabled'))
											.is.false;

										filebrowser.close();
										filebrowser.destruct();

										done();
									})
									.catch(function (e) {
										throw e;
									});
							});
						});
					});
				});
			});

			describe('View', function () {
				it('Should show filebrowser in default view', async () => {
					const filebrowser = new Jodit.modules.FileBrowser({
						view: 'tiles',
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					await filebrowser.open(function () {});

					const tiles = getButton('tiles', filebrowser._dialog);
					const list = getButton('list', filebrowser._dialog);

					const files = filebrowser.files.container;

					expect(files).is.not.null;
					expect(
						files.classList.contains(
							filebrowser.files.getFullElName('', 'view', 'tiles')
						)
					).is.true;

					expect(tiles.component.state.activated).is.true;
					expect(list.component.state.activated).is.false;

					filebrowser.close();
					filebrowser.destruct();
				});

				describe('Change view', () => {
					it('Should change filebrowser view', async () => {
						const filebrowser = new Jodit.modules.FileBrowser({
							view: 'tiles',
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						});

						await filebrowser.open(function () {});
						const tiles = getButton('tiles', filebrowser._dialog);
						const list = getButton('list', filebrowser._dialog);

						const files = filebrowser.files.container;
						expect(files).is.not.null;

						expect(
							files.classList.contains(
								filebrowser.files.getFullElName(
									'',
									'view',
									'tiles'
								)
							)
						).is.true;

						expect(tiles.component.state.activated).is.true;
						expect(list.component.state.activated).is.false;

						simulateEvent('click', list);
						expect(
							files.classList.contains(
								filebrowser.files.getFullElName(
									'',
									'view',
									'tiles'
								)
							)
						).is.false;
						expect(
							files.classList.contains(
								filebrowser.files.getFullElName(
									'',
									'view',
									'list'
								)
							)
						).is.true;
						expect(tiles.component.state.activated).is.false;
						expect(list.component.state.activated).is.true;

						filebrowser.close();
						filebrowser.destruct();
					});
				});
			});

			describe('Filter', () => {
				it('Should show only filtered items', async () => {
					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					await filebrowser.open(function () {});
					const filter =
						filebrowser._dialog.dialogbox_header.querySelector(
							'.jodit-toolbar-content_filter'
						);
					const input = filter.querySelector('input');
					const files = filebrowser.files.container;

					expect(files).is.not.null;
					expect(filter).is.not.null;
					expect(input).is.not.null;

					const count = files.querySelectorAll(
						'.' + filebrowser.files.getFullElName('item')
					).length;

					input.value = 'i';
					simulateEvent('keydown', input);

					await filebrowser.async.requestIdlePromise();

					expect(
						files.querySelectorAll(
							'.' + filebrowser.files.getFullElName('item')
						).length
					).does.not.equal(count);

					input.value = '';
					simulateEvent('keydown', input);

					await filebrowser.async.requestIdlePromise();

					expect(
						files.querySelectorAll(
							'.' + filebrowser.files.getFullElName('item')
						).length
					).equals(count);

					filebrowser.close();
					filebrowser.destruct();
				});
			});

			describe('Sort', () => {
				it('Should sort elements by filter select', async () => {
					const filebrowser = new Jodit.modules.FileBrowser({
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					await filebrowser.open(function () {});

					const sort =
						filebrowser._dialog.dialogbox_header.querySelector(
							'.jodit-toolbar-content_sort'
						);
					const select = sort.querySelector('select');
					const files = filebrowser.files.container;

					expect(files).is.not.null;
					expect(sort).is.not.null;
					expect(select).is.not.null;

					const pars = {
						'changed-asc': [
							'images.jpg',
							'1966051_524428741092238_1051008806888563137_o.jpg',
							'ibanez-s520-443140.jpg',
							'test.txt'
						],
						'changed-desc': [
							'test.txt',
							'ibanez-s520-443140.jpg',
							'1966051_524428741092238_1051008806888563137_o.jpg',
							'images.jpg'
						],
						'name-asc': [
							'1966051_524428741092238_1051008806888563137_o.jpg',
							'ibanez-s520-443140.jpg',
							'images.jpg',
							'test.txt'
						],
						'name-desc': [
							'test.txt',
							'images.jpg',
							'ibanez-s520-443140.jpg',
							'1966051_524428741092238_1051008806888563137_o.jpg'
						],
						'size-asc': [
							'images.jpg',
							'test.txt',
							'ibanez-s520-443140.jpg',
							'1966051_524428741092238_1051008806888563137_o.jpg'
						],
						'size-desc': [
							'1966051_524428741092238_1051008806888563137_o.jpg',
							'ibanez-s520-443140.jpg',
							'test.txt',
							'images.jpg'
						]
					};

					for (const key in pars) {
						select.value = key;

						simulateEvent('change', select);

						await filebrowser.async.requestIdlePromise();

						const items = files.querySelectorAll(
							'.' + filebrowser.files.getFullElName('item')
						);

						expect(
							Array.from(items)
								.map(function (item) {
									return item.querySelector(
										'.' +
											filebrowser.files.getFullElName(
												'item'
											) +
											'-info-filename'
									).textContent;
								})
								.join(',')
						).equals(pars[key].join(','));
					}

					filebrowser.close();
					filebrowser.destruct();
				});
			});

			describe('Select button', function () {
				it('Should fire first callback in open method', function (done) {
					const filebrowser = new Jodit.modules.FileBrowser({
						filebrowser: {
							saveStateInStorage: false
						},
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					});

					filebrowser
						.open(function (data) {
							expect(data !== undefined).is.true;
							expect(data.files !== undefined).is.true;
							expect(data.files.length).equals(1);
							expect(data.files[0]).equals(
								'https://xdsoft.net/jodit/files/test.txt'
							);
						})
						.then(function () {
							const select = getButton(
								'select',
								filebrowser._dialog
							);
							const files = filebrowser.files.container;

							expect(files).is.not.null;
							expect(select).is.not.null;

							expect(select.hasAttribute('disabled')).is.true;

							simulateEvent(
								'click',
								getFirstFBItem(filebrowser, 0, true)
							);

							expect(select.hasAttribute('disabled')).is.false;

							simulateEvent('click', select);

							filebrowser.close();
							filebrowser.destruct();

							done();
						})
						.catch(function (e) {
							throw e;
						});
				});
			});
		});

		describe('Test drag and drop', () => {
			describe('Drag and drop image from filebrowser', () => {
				it('Should create IMG element in editor', async () => {
					const editor = getJodit({
						defaultTimeout: 0,
						filebrowser: {
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						}
					});

					editor.value = '<p>test|</p>';
					setCursorToChar(editor);

					const filebrowser = editor.filebrowser;

					await filebrowser.open(function () {});

					const files = filebrowser.files.container;

					expect(files).is.not.null;

					simulateEvent(
						'dragstart',
						files.querySelector(
							'.' +
								filebrowser.files.getFullElName('item') +
								' img[data-src="https://xdsoft.net/jodit/files/images.jpg"]'
						)
					);

					simulateEvent('dragover', window, data => {
						fillXY(data, editor);
					});

					simulateEvent('drop', editor.editor, data => {
						fillXY(data, editor);
						Object.defineProperty(data, 'dataTransfer', {
							value: {
								files: []
							}
						});
					});

					simulateEvent('change', window);
					await editor.async.requestIdlePromise();
					expect(editor.value).equals(
						'<p>test<img src="https://xdsoft.net/jodit/files/images.jpg"></p>'
					);

					simulateEvent('drop', window);

					filebrowser.destruct();
				});
			});

			describe('Drag and drop File from filebrowser', () => {
				it('Should create A element in editor', async () => {
					const editor = getJodit({
						filebrowser: {
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						}
					});
					editor.value = '<p>test|</p>';
					setCursorToChar(editor);

					const filebrowser = editor.filebrowser;

					await filebrowser.open(function () {});

					const files = filebrowser.files.container;

					expect(files).is.not.null;

					simulateEvent(
						'dragstart',
						files.querySelector(
							'.' +
								filebrowser.files.getFullElName('item') +
								'[data-is-file="1"] img'
						)
					);

					simulateEvent('dragover', window, function (data) {
						fillXY(data, editor);
					});

					simulateEvent('drop', editor.editor, function (data) {
						fillXY(data, editor);
						Object.defineProperty(data, 'dataTransfer', {
							value: {
								files: []
							}
						});
					});

					expect(editor.value).equals(
						'<p>test<a href="https://xdsoft.net/jodit/files/test.txt">https://xdsoft.net/jodit/files/test.txt</a></p>'
					);
					simulateEvent('drop', window);

					filebrowser.destruct();
				});
			});
		});

		describe('DblClick', () => {
			describe('DblClick on image from filebrowser', () => {
				it('Should insert IMG element in editor in the selected before place', async () => {
					const editor = getJodit({
						resizer: {
							forImageChangeAttributes: true
						},
						filebrowser: {
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						}
					});

					editor.value =
						'<p>Some text</p><p>Another text</p><p>Another some text</p>';

					const range = editor.s.createRange();
					range.setStart(
						editor.editor.querySelectorAll('p')[1].firstChild,
						7
					);

					range.collapse(true);
					editor.s.selectRange(range);

					const filebrowser = editor.filebrowser;

					await filebrowser.open();

					const files = filebrowser.files.container;

					expect(files).is.not.null;

					simulateEvent(
						['click', 'dblclick'],
						files.querySelector(
							'a[data-is-file="0"].' +
								filebrowser.files.getFullElName('item')
						)
					);

					expect(editor.value).equals(
						'<p>Some text</p><p>Another<img src="https://xdsoft.net/jodit/files/ibanez-s520-443140.jpg" width="300"> text</p><p>Another some text</p>'
					);

					filebrowser.destruct();
				});
			});

			describe('DblClick on File from filebrowser', () => {
				it('Should insert A element in editor in the selected before place', async () => {
					const editor = getJodit({
						filebrowser: {
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						}
					});

					editor.value =
						'<p>Some text</p><p>Another text</p><p>Another some text</p>';
					const range = editor.s.createRange();
					range.setStart(
						editor.editor.querySelectorAll('p')[1].firstChild,
						7
					);
					range.collapse(true);
					editor.s.selectRange(range);

					const filebrowser = editor.filebrowser;

					await filebrowser.open();

					const files = filebrowser.files.container;

					expect(files).is.not.null;

					simulateEvent(
						['click', 'dblclick'],
						files.querySelector(
							'a[data-is-file="1"].' +
								filebrowser.files.getFullElName('item')
						)
					);

					expect(editor.value).equals(
						'<p>Some text</p><p>Another<a href="https://xdsoft.net/jodit/files/test.txt" title="https://xdsoft.net/jodit/files/test.txt">https://xdsoft.net/jodit/files/test.txt</a> text</p><p>Another some text</p>'
					);

					filebrowser.destruct();
				});
			});
		});

		describe('Uploader', () => {
			describe('Drag and drop', () => {
				describe('Image', () => {
					it('Should create IMG element', done => {
						const editor = getJodit({
							resizer: {
								forImageChangeAttributes: false
							},
							uploader: {
								url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload'
							},
							filebrowser: {
								ajax: {
									url: 'https://xdsoft.net/jodit/connector/index.php'
								}
							}
						});

						editor.value = '<p>test|</p>';
						setCursorToChar(editor);

						editor.events.on('filesWereUploaded', function () {
							try {
								expect(sortAttributes(editor.value)).equals(
									'<p>test<img src="https://xdsoft.net/jodit/files/test.png" style="width:300px"></p>'
								);
								done();
							} catch (e) {
								done(e);
							}
						});

						simulateEvent('drop', editor.editor, function (data) {
							fillXY(data, editor);
							Object.defineProperty(data, 'dataTransfer', {
								value: {
									files: [
										{ name: 'test.png', type: 'image/png' }
									]
								}
							});
						});
					});
				});

				describe('File', function () {
					it('Should create A element', function (done) {
						const editor = getJodit({
							uploader: {
								url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload'
							},
							filebrowser: {
								ajax: {
									url: 'https://xdsoft.net/jodit/connector/index.php'
								}
							}
						});

						editor.value = '<p>test|</p>';
						setCursorToChar(editor);

						editor.events.on('filesWereUploaded', function () {
							expect(editor.value).equals(
								'<p>test<a href="https://xdsoft.net/jodit/files/test.txt">https://xdsoft.net/jodit/files/test.txt</a></p>'
							);
							done();
						});

						simulateEvent('drop', editor.editor, function (data) {
							fillXY(data, editor);
							Object.defineProperty(data, 'dataTransfer', {
								value: {
									files: [
										{ name: 'test.txt', type: 'plain/text' }
									]
								}
							});
						});
					});
				});
			});
		});

		describe('CRUD Folder', () => {
			let editor, filebrowser;

			beforeEach(async () => {
				editor = getJodit({
					filebrowser: {
						ajax: {
							url: 'https://xdsoft.net/jodit/connector/index.php'
						}
					}
				});

				filebrowser = editor.filebrowser;
				await filebrowser.open(function () {});
			});

			describe('Rename', () => {
				let dialog, tree;

				beforeEach(() => {
					tree = filebrowser.tree.container;

					expect(tree).is.not.null;

					const item = tree.querySelectorAll(
						'.' + filebrowser.tree.getFullElName('item')
					)[1];

					expect(item).is.not.null;

					const trigger = getButton('rename', item);

					expect(trigger).is.not.null;

					expect(trigger.parentElement.textContent.trim()).equals(
						'ceicom'
					);
					simulateEvent('click', trigger);

					dialog = getOpenedDialog(editor);
					expect(dialog).is.not.null;
					expect(dialog).does.not.equal(filebrowser._dialog);

					expect(dialog.querySelector('input').value).equals(
						'ceicom'
					);
				});

				describe('Folder', () => {
					it('Should create button inside every folder of list', async () => {
						dialog.querySelector('input').value = 'ceicom1';
						clickButton('ok', dialog);

						await filebrowser.async.requestIdlePromise();

						const item2 = tree.querySelectorAll(
							'.' + filebrowser.tree.getFullElName('item')
						)[1];
						expect(item2.textContent.trim()).equals('ceicom1');
					});

					describe('With space', () => {
						it('Should rename folder correct', async () => {
							dialog.querySelector('input').value =
								'ceicom1 post';
							clickButton('ok', dialog);

							await filebrowser.async.requestIdlePromise();

							const item2 = tree.querySelectorAll(
								'.' + filebrowser.tree.getFullElName('item')
							)[1];
							expect(item2.textContent.trim()).equals(
								'ceicom1 post'
							);
						});

						describe('Only space', () => {
							it('Should not rename folder correct', async () => {
								dialog.querySelector('input').value = '    ';
								clickButton('ok', dialog);

								await filebrowser.async.requestIdlePromise();

								const item2 = tree.querySelectorAll(
									'.' + filebrowser.tree.getFullElName('item')
								)[1];
								expect(item2.textContent.trim()).equals(
									'ceicom'
								);
							});
						});
					});
				});
			});

			describe('Remove', () => {
				describe('Folder', () => {
					it('Should create button inside every folder of list', async () => {
						const tree = filebrowser.tree.container;

						expect(tree).is.not.null;

						const item = tree.querySelectorAll(
							'.' + filebrowser.tree.getFullElName('item')
						)[1];

						expect(item).is.not.null;

						const trigger = getButton('remove', item);

						expect(trigger).is.not.null;

						simulateEvent('click', trigger);

						const dialog = getOpenedDialog(editor);
						expect(dialog).is.not.null;
						expect(dialog).does.not.equal(filebrowser._dialog);

						clickButton('ok', dialog);

						filebrowser.destruct();
					});
				});
			});

			describe('Create', () => {
				describe('Folder', () => {
					it('Should create button below folders list', async () => {
						const addfolder = getButton('plus', filebrowser.tree);
						expect(addfolder).is.not.null;
					});

					describe('Create new folder', () => {
						it('Should create new folder', async () => {
							const addfolder = getButton(
								'plus',
								filebrowser.tree
							);

							expect(addfolder).is.not.null;

							simulateEvent('click', addfolder);

							const dialog = getOpenedDialog(editor);

							expect(dialog).is.not.null;
							dialog.querySelector('input').value = 'free';
							clickButton('ok', dialog);
							await filebrowser.async.requestIdlePromise();

							const tree = filebrowser.tree.container;

							const item = tree.querySelectorAll(
								'.' + filebrowser.tree.getFullElName('item')
							)[1];
							expect(item.textContent.trim()).equals('free');
						});
					});
				});
			});
		});

		describe('Context menu', () => {
			describe('Right click on image', () => {
				it('Should open context menu', async () => {
					const editor = getJodit({
						filebrowser: {
							ajax: {
								url: 'https://xdsoft.net/jodit/connector/index.php'
							}
						}
					});

					const filebrowser = editor.filebrowser;

					await filebrowser.open(function () {});

					const files = filebrowser.files.container;

					expect(files).is.not.null;

					const item = files.querySelector(
							'.' +
								filebrowser.files.getFullElName('item') +
								'[data-is-file="1"]'
						),
						pos = Jodit.modules.Helpers.position(item);

					simulateEvent('contextmenu', item, function (o) {
						Object.assign(o, {
							clientX: pos.left + 10,
							clientY: pos.top + 10
						});
					});

					const context = getOpenedPopup(filebrowser);

					expect(context).is.not.null;
				});

				describe('Second time', () => {
					// https://github.com/xdan/jodit/issues/1059
					it('Should not double content ', async () => {
						const editor = getJodit({
							filebrowser: {
								ajax: {
									url: 'https://xdsoft.net/jodit/connector/index.php'
								}
							}
						});

						const filebrowser = editor.filebrowser;

						await filebrowser.open(() => {});

						const files = filebrowser.files.container;

						expect(files).is.not.null;

						const item = files.querySelector(
								'.' +
									filebrowser.files.getFullElName('item') +
									'[data-is-file="1"]'
							),
							pos = Jodit.modules.Helpers.position(item);

						simulateEvent('contextmenu', item, o => {
							Object.assign(o, {
								clientX: pos.left + 10,
								clientY: pos.top + 10
							});
						});

						const context = getOpenedPopup(filebrowser);

						expect(context).is.not.null;

						expect(
							context.textContent.trim().replace(/\s+/g, ' ')
						).equals('Rename Delete Preview Download');

						simulateEvent('mousedown', editor.editor);

						const context2 = getOpenedPopup(filebrowser);

						expect(context2).is.null;

						simulateEvent('contextmenu', item, o => {
							Object.assign(o, {
								clientX: pos.left + 10,
								clientY: pos.top + 10
							});
						});

						const context3 = getOpenedPopup(filebrowser);
						expect(context3).is.not.null;
						expect(
							context3.textContent.trim().replace(/\s+/g, ' ')
						).equals('Rename Delete Preview Download');
					});
				});

				describe('Closing FileBrowser', () => {
					it('Should close context menu', async () => {
						const editor = getJodit({
							filebrowser: {
								ajax: {
									url: 'https://xdsoft.net/jodit/connector/index.php'
								}
							}
						});

						const filebrowser = editor.filebrowser;

						await filebrowser.open(() => {});

						const files = filebrowser.files.container;

						expect(files).is.not.null;

						const item = files.querySelector(
								'.' +
									filebrowser.files.getFullElName('item') +
									'[data-is-file="1"]'
							),
							pos = Jodit.modules.Helpers.position(item);

						simulateEvent('contextmenu', item, o => {
							Object.assign(o, {
								clientX: pos.left + 10,
								clientY: pos.top + 10
							});
						});

						const context = getOpenedPopup(filebrowser);

						expect(context).is.not.null;

						const dialog = getOpenedDialog(filebrowser);

						expect(dialog).is.not.null;

						dialog.component.close();
						expect(getOpenedPopup(filebrowser)).is.null;
					});
				});

				describe('Click on preview', () => {
					it('Should open preview dialog', async () => {
						unmockPromise();

						const editor = getJodit({
							filebrowser: {
								ajax: {
									url: 'https://xdsoft.net/jodit/connector/index.php'
								}
							}
						});

						const filebrowser = editor.filebrowser;

						await filebrowser.open();
						const files = filebrowser.files.container;

						expect(files).is.not.null;

						const item = getFirstFBItem(filebrowser),
							pos = Jodit.modules.Helpers.position(item);

						simulateEvent('contextmenu', item, function (o) {
							Object.assign(o, {
								clientX: pos.left + 10,
								clientY: pos.top + 10
							});
						});

						const context = getOpenedPopup(filebrowser);

						expect(context).is.not.null;

						clickButton('eye', context);

						await new Promise(resolve =>
							filebrowser.events.one(
								'previewOpenedAndLoaded',
								resolve
							)
						);

						const dialog = getOpenedDialog(filebrowser);

						expect(dialog).is.not.null;
						const previewsButtons = dialog.querySelectorAll(
							'.jodit-file-browser-preview__navigation'
						);

						expect(previewsButtons.length).equals(2);
					});
				});
			});
		});
	}
);
